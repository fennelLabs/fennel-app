import React, {useState, useContext} from 'react';
import {useServiceContext} from '../../../contexts/ServiceContext';
import Button from '../../components/Button';
import Text from '../../components/Text';

function GenerateWallet() {
  const [mnemonic, setMnemonic] = useState('');
  const {_, keymanager} = useServiceContext();

  return (
    <div>
      <h1>Generate Wallet</h1>
      <Text>{mnemonic}</Text>
      <Button
        onClick={() => {
          setMnemonic(keymanager.generateAccount('Main'));
        }}
      >
        Generate
      </Button>
    </div>
  );
}

export default GenerateWallet;
