import React from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import ContactsSubNav from '../../components/ContactsSubNav';

function AddContact() {
  return (
    <PageContainer>
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
    </PageContainer>
  );
}

export default AddContact;
