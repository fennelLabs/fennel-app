import React, {useState, useContext} from 'react';
import Button from '../../components/Button';
import KeyManagerContext from '../../../contexts/KeyManagerContext';

function RestoreWallet(props) {
  const [value, setValue] = useState('');
  const keymanager = useContext(KeyManagerContext);

  return (
    <div>
      <h1>Import Fennel Wallet</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          keymanager.importAccount('Main', value);
        }}
      >
        <textarea
          name="new_message"
          rows={5}
          cols={5}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default RestoreWallet;
