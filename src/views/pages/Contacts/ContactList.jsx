import React, {useEffect, useState} from 'react';
import {useServiceContext} from '../../../contexts/ServiceContext';

function ContactsList() {
  const {contactsManager} = useServiceContext();
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const sub = contactsManager.identities$.subscribe((d) => {
      setContactList(d);
    });

    contactsManager.populateContacts();

    let id = setInterval(() => {
      contactsManager.populateContacts();
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
