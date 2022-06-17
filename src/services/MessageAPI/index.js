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

  async sendMessage({
    message,
    fingerprint,
    signature,
    publicKey,
    sender,
    recipient,
    message_encryption_indicator
  }) {
    let retval = await axios
      .post(
        `${API_MESSAGES}/`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        },
        {
          message: message,
          public_key: publicKey,
          signature: signature,
          fingerprint: fingerprint,
          sender: `${API_IDENTITIES}/${sender}/`,
          recipient: `${API_IDENTITIES}/${recipient}/`,
          message_encryption_indicator: `${API_MESSAGE_ENCRYPTION_INDICATORS}/${message_encryption_indicator}/`
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
