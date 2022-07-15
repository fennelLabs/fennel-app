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
    return new Promise((res, rej) => {
      try {
        if (message_encryption_indicator == 2) {
          this._rpc.encrypt(publicKey, message, (r) => {
            res(r);
          });
        } else {
          res(message);
        }
      } catch (e) {
        rej(e);
      }
    }).then((message) =>
      sendMessage(
        message,
        {
          publicKey,
          signature,
          fingerprint,
          sender,
          recipient
        },
        message_encryption_indicator
      )
    );
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
    const messages = await Promise.all(
      data.map((message) => {
        return new Promise((res, rej) => {
          // If the message is marked with indicator 1 (UNENCRYPTED), treat it as plaintext.
          // If the message is marked with indicator 2 (RSA_ENCRYPTED), treat it as an RSA-encrypted message.
          if (message.message_encryption_indicator.endsWith('2/')) {
            this._rpc.decrypt(message.message, (r) => {
              message.message = decodeHex(r);
              res(message);
            });
          } else {
            res(message);
          }
        });
      })
    );

    // I'm thinking about doing a quick visual effect where you see the ciphertext and then watch messages decrypt in real time.
    this._received_messages.next(messages);
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

// Thanks to Denys Séguret at https://stackoverflow.com/a/13698172 for a clean way to de-hex.
function decodeHex(hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
    var v = parseInt(hex.substr(i, 2), 16);
    if (v) str += String.fromCharCode(v);
  }
  return str;
}

function sendMessage(
  message,
  {publicKey, signature, fingerprint, sender, recipient},
  indicator
) {
  return axios({
    method: 'post',
    url: `${API_MESSAGES}/`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      message,
      public_key: publicKey,
      signature: signature,
      fingerprint: fingerprint,
      sender: `${API_IDENTITIES}/${sender}/`,
      recipient: `${API_IDENTITIES}/${recipient}/`,
      message_encryption_indicator: `${API_MESSAGE_ENCRYPTION_INDICATORS}/${indicator}/`
    }
  })
    .then(() => true)
    .catch(() => false);
}

export default MessageAPIService;
