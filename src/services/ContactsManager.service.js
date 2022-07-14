import {BehaviorSubject} from 'rxjs';
import axios from 'axios';

export default class ContactsManager {
  /**
   * @private
   */
  _identities = new BehaviorSubject([]);

  /**
   * @private
   */
  _defaultSender = new BehaviorSubject(undefined);

  identities$ = this._identities.asObservable();

  defaultSender = {
    $: this._defaultSender.asObservable(),
    current: () => this._defaultSender.value
  };

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
    }).then((response) => {
      const r = response?.data;
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
