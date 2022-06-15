import React, {useState} from 'react';
import Button from '../../components/Button';
import Text from '../../components/Text';

function GenerateWallet(props) {
  const [mnemonic, setMnemonic] = useState('');

  return (
    <div>
      <h1>Generate Wallet</h1>
      <Text>{mnemonic}</Text>
      <Button
        onClick={() => {
          setMnemonic(props.keymanager.generateAccount('Main'));
        }}
      >
        Generate
      </Button>
    </div>
  );
}

GenerateWallet.propTypes = {
  keymanager: PropTypes.function
};

export default GenerateWallet;
