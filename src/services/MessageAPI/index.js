import axios from 'axios';
import {BehaviorSubject} from 'rxjs';
import useFennelRPC from '../../utils/useFennelRPC';

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
    sender_id,
    recipient_id,
    message_encryption_indicator_id
  ) {
    let ciphertext = null;
    this._rpc.encrypt(message, (r) => {
      ciphertext = r;
    });
    let retval = await axios
      .post(
        `http://localhost:1234/api/messages/`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        },
        {
          message: ciphertext,
          public_key: publicKey,
          signature: signature,
          fingerprint: fingerprint,
          sender: `http://localhost:1234/api/identities/${sender_id}/`,
          recipient: `http://localhost:1234/api/identities/${recipient_id}/`,
          message_encryption_indicator: `http://localhost:1234/api/message_encryption_indicators/${message_encryption_indicator_id}/`
        }
      )
      .then(function (response) {
        console.log(response.data.results);
        return response.data.results;
      })
      .catch(function (error) {
        console.error(error);
        return [];
      });
    this.__addSentMessage(retval);
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
    this.__populateSentMessages(retval);
  }

  __decryptMessageList(data) {
    data.forEach((message) => {
      this._rpc.decrypt(message, (r) => {
        this._receive_messages.next([...this._receive_messages.value, r]);
      });
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
