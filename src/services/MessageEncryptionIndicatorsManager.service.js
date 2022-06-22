import {BehaviorSubject} from 'rxjs';
import axios from 'axios';

export default class MessageEncryptionIndicatorsManager {
  _message_encryption_indicators = new BehaviorSubject([]);

  message_encryption_indicators$ = this._message_encryption_indicators.asObservable();

  async populateIndicators() {
    let results = await axios
      .get(`http://localhost:1234/api/message_encryption_indicators/`, {
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
    this._message_encryption_indicators.next([...results]);
  }
}
