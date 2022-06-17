import React, {useEffect, useState} from 'react';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

class ContactsManager {
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
}

const contactService = new ContactsManager();

function ContactsList() {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const sub = contactService.identities$.subscribe((d) => {
      setContactList(d);
    })

    contactService.populateContacts();

    let id = setInterval(() => {
      contactService.populateContacts();
    }, 5000);

    return () => {
      sub.remove();
      clearInterval(id);
    };
  }, []);

  return (
    <div style={{width: '90%'}}>
      {contactList.map(({id, fingerprint}) => (
        <div key={id}>{fingerprint}</div>
      ))}
    </div>
  );
}

export default ContactsList;
