import React, {useState, useContext} from 'react';
import Button from '../../components/Button';
import Text from '../../components/Text';
import KeyManagerContext from '../../../contexts/KeyManagerContext';

function GenerateWallet() {
  const [mnemonic, setMnemonic] = useState('');
  const keymanager = useContext(KeyManagerContext);

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
