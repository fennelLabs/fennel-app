import React, {useState} from 'react';
import {useServiceContext} from '../../../contexts/ServiceContext';

function RestoreWallet(props) {
  const [value, setValue] = useState('');
  const {keymanager} = useServiceContext();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        keymanager.importAccount('Main', value);
      }}
      className="grid gap-4 w-full h-full"
    >
      <h1>Import Fennel Wallet</h1>
      <textarea
        name="new_message"
        rows={5}
        cols={5}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <div className="my-2">
        <button className="btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default RestoreWallet;
