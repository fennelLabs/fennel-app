import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

export default class MessageEncryptionIndicatorsManager {
  _message_encryption_indicators = new BehaviorSubject([]);

  message_encryption_indicators$ =
    this._message_encryption_indicators.asObservable();

  populateIndicators() {
    axios({
      method: 'get',
      url: 'http://localhost:1234/api/message_encryption_indicators/',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
        this._message_encryption_indicators.next([...response.data]);
      })
      .catch(function (error) {
        console.error(error);
        return [];
      });
  }
}
