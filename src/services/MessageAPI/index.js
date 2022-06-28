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
    let ciphertext = null;
    if (message_encryption_indicator == 2) {
      this._rpc.encrypt(publicKey, message, (r) => {
        ciphertext = r;
      });
    } else {
      ciphertext = message;
    }
    let retval = await axios({
      method: 'post',
      url: `${API_MESSAGES}/`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        message: ciphertext,
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
    let results = await axios
      .get(`http://localhost:1234/api/messages/?recipient=${recipientID}/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        console.log(response.data.results);
        return response.data.results;
      })
      .catch(function (error) {
        console.error(error);
        return [];
      });
    this.__populateReceivedMessages(results);
  }

  async getSentMessages(senderID) {
    let retval = await axios
      .get(`http://localhost:1234/api/messages/?sender=${senderID}/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        console.log(response.data.results);
        return response.data.results;
      })
      .catch(function (error) {
        console.error(error);
        return [];
      });
    this.__decryptMessageList(retval);
  }

  __decryptMessageList(data) {
    data.forEach((message) => {
      // If the message is marked with indicator 1 (UNENCRYPTED), treat it as plaintext.
      // If the message is marked with indicator 2 (RSA_ENCRYPTED), treat it as an RSA-encrypted message.
      if (
        message.message_encryption_indicator ==
        `${API_MESSAGE_ENCRYPTION_INDICATORS}/2`
      ) {
        this._rpc.decrypt(message.message, (r) => {
          message.message = r;
        });
      }
      this._receive_messages.next([...this._receive_messages.value, message]);
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
