import axios from 'axios';
import {BehaviorSubject} from 'rxjs';
import {
  API_MESSAGES,
  API_IDENTITIES,
  API_MESSAGE_ENCRYPTION_INDICATORS
} from '../../config';

class MessageAPIService {
  _sent_messages = new BehaviorSubject([]);
  _received_messages = new BehaviorSubject([]);
  _message = new BehaviorSubject(undefined);

  sent_messages$ = this._sent_messages.asObservable();
  received_messages$ = this._received_messages.asObservable();

  constructor(rpc) {
    this._rpc = rpc;
  }

  async sendMessage(
    message,
    fingerprint,
    signature,
    publicKey,
    sender,
    recipient,
    message_encryption_indicator
  ) {
    if (message_encryption_indicator == 2) {
      // `await`ing this doesn't change the race condition.
      this._rpc.encrypt(publicKey, message, (r) => {
        this._message.next(r); // This doesn't get set early enough.
      });
    } else {
      this._message.next(message);
    }
    // Just give the RPC a second to respond.
    await new Promise((sleep) => setTimeout(sleep, 1000));
    let retval = await axios({
      method: 'post',
      url: `${API_MESSAGES}/`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        message: this._message.value,
        public_key: publicKey,
        signature: signature,
        fingerprint: fingerprint,
        sender: `${API_IDENTITIES}/${sender}/`,
        recipient: `${API_IDENTITIES}/${recipient}/`,
        message_encryption_indicator: `${API_MESSAGE_ENCRYPTION_INDICATORS}/${message_encryption_indicator}/`
      }
    })
      .then(function (_) {
        return true;
      })
      .catch(function (_) {
        return false;
      });
    return retval;
  }

  async checkMessages(recipientID) {
    let url = `http://localhost:1234/api/messages/?recipient=${recipientID}`;
    let results = await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        } else {
          return [];
        }
      })
      .catch(function (error) {
        console.error(error);
        return [];
      });
    this.__decryptMessageList(results);
  }

  async getSentMessages(senderID) {
    let url = `http://localhost:1234/api/messages/?sender=${senderID}`;
    let retval = await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        return response.data.results;
      })
      .catch(function (error) {
        console.error(error);
        return [];
      });
    this.__decryptMessageList(retval);
  }

  async __decryptMessageList(data) {
    console.log('Decrypting messages.');
    data.forEach(async (message) => {
      console.log('Checking for decrypt on: ');
      console.log(`${message.message_encryption_indicator}`);
      console.log(`${API_MESSAGE_ENCRYPTION_INDICATORS}/2/`);
      // If the message is marked with indicator 1 (UNENCRYPTED), treat it as plaintext.
      // If the message is marked with indicator 2 (RSA_ENCRYPTED), treat it as an RSA-encrypted message.
      if (
        message.message_encryption_indicator ==
        `${API_MESSAGE_ENCRYPTION_INDICATORS}/2/`
      ) {
        console.log(`Decrypting ${message.message}`);
        this._rpc.decrypt(message.message, (r) => {
          // Thanks to Denys Séguret at https://stackoverflow.com/a/13698172 for a clean way to de-hex.
          // Doing this as an anonymous lambda since we're not using it anywhere else.
          message.message = ((hex) => {
            var str = '';
            for (var i = 0; i < hex.length; i += 2) {
              var v = parseInt(hex.substr(i, 2), 16);
              if (v) str += String.fromCharCode(v);
            }
            return str;
          })(r);
          console.log('Finished decryption.');
        });
        // Going to let the RPC catch up with us here too.
        await new Promise((sleep) => setTimeout(sleep, 1000));
      }
      console.log('Adding message.');
      // I'm thinking about doing a quick visual effect where you see the ciphertext and then watch messages decrypt in real time.
      this._received_messages.next([...this._received_messages.value, message]);
    });
  }

  __populateReceivedMessages(data) {
    this._received_messages.next([...data]);
  }

  __populateSentMessages(data) {
    this._sent_messages.next([...data]);
  }

  __addSentMessage(data) {
    this._sent_messages.next([...data]);
  }
}

export default MessageAPIService;
