import {BehaviorSubject} from 'rxjs';
import axios from 'axios';

export default class ContactsManager {
  _identities = new BehaviorSubject([]);

  identities$ = this._identities.asObservable();

  async populateContacts() {
    let results = await axios
      .get(`http://localhost:1234/api/identities/`, {
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
    this._identities.next([...results]);
  }

  async createNewIdentity(fingerprint, publicKey) {
    let results = await axios
      .post(`http://localhost:1234/api/identities/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      },
      {
        fingerprint: fingerprint,
        public_key: publicKey,
        shared_secret_key: "",
      })
      .then(function (response) {
        console.log(response.data.results);
        return response.data.results;
      })
      .catch(function (error) {
        console.error(error);
        return [];
      });
    this._identities.next([...this._identities.value, ...results]);
  }
}
