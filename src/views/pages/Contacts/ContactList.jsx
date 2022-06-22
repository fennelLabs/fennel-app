import React, {useEffect, useState} from 'react';
import ContactsManager from '../../../services/ContactsManager.service';

const contactService = new ContactsManager();

function ContactsList() {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const sub = contactService.identities$.subscribe((d) => {
      setContactList(d);
    });

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
      {contactList.length > 0 ? (
        contactList.map(({id, fingerprint}) => (
          <div key={id}>{fingerprint}</div>
        ))
      ) : (
        <div>No contacts.</div>
      )}
    </div>
  );
}

export default ContactsList;
