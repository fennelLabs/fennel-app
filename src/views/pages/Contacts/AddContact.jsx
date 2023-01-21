import React from 'react';
import Button from '../../components/Button';

function AddContact() {
  return (
    <div>
      <div>
        <textarea name="first_name" />
        <textarea name="last_name" />
        <textarea name="blockchain_id" />
        <div style={{ flexDirection: 'row' }}>
          <Button>Add</Button>
        </div>
      </div>
    </div>
  );
}

export default AddContact;
