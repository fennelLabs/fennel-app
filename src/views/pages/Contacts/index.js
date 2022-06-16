import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import ContactsList from './ContactList';
import AddContact from './AddContact';
import EditContact from './EditContact';

function Contacts() {
  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <ul className="menu bg-base-300 w-56 p-2 rounded-box">
          <li>
            <Link to="/contacts">List Contacts</Link>
          </li>
          {/* <li>
            <Link to="add">Add Contact</Link>
          </li>
          <li>
            <Link to="edit">Edit Contact</Link>
          </li> */}
        </ul>
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Contacts</PageTitle>
        <Text>
          Some text explaining what this is all about and what to expect.
        </Text>
        <Routes>
          <Route path="" element={<ContactsList />} />
          {/* <Route path="add" element={<AddContact />} />
          <Route path="edit" element={<EditContact />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default Contacts;
