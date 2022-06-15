import React from 'react';
import PageTitle from '../../components/PageTitle';
import ContactsSubNav from '../../components/ContactsSubNav';

function AddContact() {
  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <ContactsSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Add Contact</PageTitle>
        <div>
          <div>
            <textarea name="first_name" />
            <textarea name="last_name" />
            <textarea name="blockchain_id" />
            <div style={{flexDirection: 'row'}}>
              <button name="submit" />
              <button name="cancel" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddContact;
