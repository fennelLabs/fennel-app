import React from 'react';
import {Routes, Route} from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import ContactsSubNav from '../../components/ContactsSubNav';
import ContactsList from '../../components/Contact/ContactsList';
import AddContact from '../AddContact';

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
        <Routes>
          <Route path="" element={<ContactsList />} />
          <Route path="add" element={<AddContact />} />
        </Routes>
      </div>
    </div>
  );
}

export default Contacts;
