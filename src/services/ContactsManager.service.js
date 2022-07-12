import {BehaviorSubject, Subject} from 'rxjs';
import axios from 'axios';

export default class ContactsManager {
  _identities = new BehaviorSubject([]);
  _defaultSender = new BehaviorSubject(undefined);

  identities$ = this._identities.asObservable();
  defaultSender$ = this._defaultSender.asObservable();

  getContactKey(contact_id, callback) {
    const checkedContact = new Subject();
    const sub = checkedContact.subscribe((id) => {
      callback(id);
      sub.unsubscribe();
    });
    axios
      .get(`http://localhost:1234/api/identities/${contact_id}`, {
        headers: {'Content-Type': 'application/json'}
      })
      .then((response) => {
        console.log(response);
        const r = response?.data?.public_key;
        console.log(r);
        checkedContact.next(r);
      })
      .catch((error) => {
        console.error(error);
        checkedContact.next(undefined);
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
          this._defaultSender.next(r.id);
        }
      }
      return r;
    });
  }
}
