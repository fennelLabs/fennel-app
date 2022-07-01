import React, {useState, useContext} from 'react';
import {useServiceContext} from '../../../contexts/ServiceContext';
import Button from '../../components/Button';
import Text from '../../components/Text';

function GenerateWallet() {
  const [mnemonic, setMnemonic] = useState('');
  const {keymanager} = useServiceContext();
  const [error, setError] = useState(undefined);

  function generateMnemonic() {
    try {
      setMnemonic(keymanager.generateAccount('Main'));
      setError(undefined);
    } catch {
      setError('Key Manager has failed. Please try again.');
    }
  }

  return (
    <div>
      <h1>Generate Wallet</h1>
      <Text>{mnemonic}</Text>
      {error && (
        <div
          className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
          role="alert"
        >
          {error}
        </div>
      )}
      <Button
        onClick={() => {
          generateMnemonic();
        }}
      >
        Generate
      </Button>
    </div>
  );
}

export default GenerateWallet;
