import React, { useState } from 'react';
import { useServiceContext } from '../../../contexts/ServiceContext';
import { Error } from './Error';

function RestoreWallet(props) {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { keymanager } = useServiceContext();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (
          validateSeedPhrase() &&
          keymanager.importAccount('Main', seedPhrase)
        ) {
          setSuccess(true);
          setError(null);
        }
      }}
      className="grid gap-4 w-full h-full"
    >
      <h1>Import Fennel Wallet</h1>
      <div className="flex flex-row">
        <div>
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
        <div className="ml-4 self-center px-3">
          <span>
            {success && 'Successfully imported wallet!'}
            <Error>{error}</Error>
          </span>
        </div>
      </div>
      <textarea
        name="new_message"
        rows={5}
        cols={5}
        value={seedPhrase}
        onChange={(event) => {
          setSeedPhrase(event.target.value);
        }}
      />
    </form>
  );

  function validateSeedPhrase() {
    setSuccess(false);
    const isValid =
      seedPhrase && seedPhrase.length > 0 && !/^\s+$/g.test(seedPhrase);

    if (isValid && error) {
      setError(null);
    } else if (!isValid && !error) {
      setError(
        'This is not a valid seed phrase. Please check the text input and try again.'
      );
    }

    return isValid;
  }
}

export default RestoreWallet;
