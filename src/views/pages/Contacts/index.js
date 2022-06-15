import React from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import ContactsSubNav from '../../components/ContactsSubNav';
import ContactsList from '../../components/Contact/ContactsList';

function Contacts() {
  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <ContactsSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Contacts</PageTitle>
        <Text>
          Some text explaining what this is all about and what to expect.
        </Text>
        <ContactsList />
        <Button>Add</Button>
      </div>
    </div>
  );
}

export default Contacts;
