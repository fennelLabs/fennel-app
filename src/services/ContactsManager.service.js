import {BehaviorSubject, Subject} from 'rxjs';
import axios from 'axios';

export default class ContactsManager {
  _identities = new BehaviorSubject([]);
  _defaultSender = new BehaviorSubject(undefined);

  identities$ = this._identities.asObservable();
  defaultSender$ = this._defaultSender.asObservable();

  async getContactKey(contact_id) {
    return await axios
      .get(`http://localhost:1234/api/identities/${contact_id}`, {
        headers: {'Content-Type': 'application/json'}
      })
      .then((response) => {
        console.log(response);
        const r = response?.data;
        console.log(r);
        return r;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

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
          console.log(`contact object: ${r}`);
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
    }).then((response) => {
      const r = response?.data;
      console.log(r);
      if (r) {
        this._identities.next([...this._identities.value, r]);
        if (!this._defaultSender.value) {
          console.log(`Setting defaultSender to ${r.id}`);
          this._defaultSender.next(r.id);
        }
      }
      return r;
    });
  }
}
