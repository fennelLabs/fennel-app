import axios from 'axios';
import {BehaviorSubject} from 'rxjs';

class MessageAPIService {
  _sent_messages = new BehaviorSubject([]);
  _received_messages = new BehaviorSubject([]);

  sent_messages$ = this._sent_messages.asObservable();
  received_messages$ = this._received_messages.asObservable();

  async sendMessage(
    message,
    fingerprint,
    signature,
    publicKey,
    sender_id,
    recipient_id,
    message_encryption_indicator_id
  ) {
    let retval = undefined;
    await axios
      .post(
        `http://localhost:1234/api/messages/`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        },
        {
          message: message,
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
        retval = response.data.results;
      })
      .catch(function (error) {
        console.error(error);
        retval = [];
      });
    this.__addSentMessage(retval);
  }

  async checkMessages(recipientID) {
    let results = await axios
      .get(`http://localhost:1234/api/messages/?recipient=${recipientID}/`, {
        headers: {
          'Content-Type': 'application/json',
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
    let retval = undefined;
    await axios
      .get(`http://localhost:1234/api/messages/?sender=${senderID}/`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(function (response) {
        console.log(response.data.results);
        retval = response.data.results;
      })
      .catch(function (error) {
        console.error(error);
        retval = [];
      });
    this.__populateSentMessages(retval);
  }

  __populateReceivedMessages(data) {
    this._received_messages.next([
      ...this._received_messages.value,
      ...data
    ]);
  }

  __populateSentMessages(data) {
    this._sent_messages.next([
      ...this._sent_messages.value,
      ...data
    ]);
  }

  __addSentMessage(data) {
    this._sent_messages.next([
      ...this._sent_messages.value,
      ...data
    ]);
  }
}

export default MessageAPIService;
