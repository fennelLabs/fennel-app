import React, {useState} from 'react';
import Button from '../../components/Button';
import PropTypes from 'prop-types';

function RestoreWallet(props) {
  const [value, setValue] = useState('');

  return (
    <div>
      <h1>Import Fennel Wallet</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.keymanager.importAccount('Main', value);
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

RestoreWallet.propTypes = {
  keymanager: PropTypes.function
};

export default RestoreWallet;
