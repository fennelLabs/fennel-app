import React, {useState, useContext} from 'react';
import {useServiceContext} from '../../../contexts/ServiceContext';
import Button from '../../components/Button';
import Error from '../../components/Error';
import Text from '../../components/Text';

function GenerateWallet() {
  const [mnemonic, setMnemonic] = useState('');
  const {_, keymanager} = useServiceContext();
  const [error, setError] = useState('');

  function generateMnemonic() {
    try {
      setMnemonic(keymanager.generateAccount('Main'));
      setError('');
    } catch {
      setError('Key Manager has failed. Please try again.');
    }
  }

  return (
    <div>
      <h1>Generate Wallet</h1>
      <Text>{mnemonic}</Text>
      {error && <Error>{error}</Error>}
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
