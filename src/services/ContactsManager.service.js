import {BehaviorSubject} from 'rxjs';
import axios from 'axios';

export default class ContactsManager {
  _identities = new BehaviorSubject([]);

  identities$ = this._identities.asObservable();

  populateContacts() {
    return axios
      .get(`http://localhost:1234/api/identities/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const r = response?.data?.results;
        if (r) {
          this._identities.next([...r]);
        }
        return r;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  createNewIdentity(on_chain_identity_number, fingerprint, publicKey) {
    return axios({
      method: 'post',
      url: 'http://localhost:1234/api/identities/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        on_chain_identity_number: parseInt(on_chain_identity_number),
        fingerprint: fingerprint,
        public_key: publicKey,
        shared_secret_key: '_blank'
      }
    })
      .then((response) => {
        const r = response?.data?.results;
        if (r) {
          this._identities.next([...this._identities.value, ...r]);
        }
        return r;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }
}
