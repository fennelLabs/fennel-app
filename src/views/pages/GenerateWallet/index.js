import React, {useState, useContext} from 'react';
import {useServiceContext} from '../../../contexts/ServiceContext';
import {useIpfsFactory} from '../../hooks/useIpfsFactory';
import Button from '../../components/Button';

function GenerateWallet() {
  const [mnemonic, setMnemonic] = useState('');
  const {keymanager, ipfs} = useServiceContext();
  const [error, setError] = useState(undefined);

  async function generateMnemonic() {
    try {
      setMnemonic(keymanager.generateAccount('Main'));
      //test ipfs here
      const cid = await ipfs.putFile('abc');
      setError(undefined);
    } catch {
      setError('Key Manager has failed. Please try again.');
    }
  }

  return (
    <div>
      <div className="flex flex-col mb-2">
        <h1>Generate Wallet</h1>
        {error && (
          <div
            className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
            role="alert"
          >
            {error}
          </div>
        )}
        <div className="h-full flex items-center py-3">
          <div className="break-word w-[15rem]">{mnemonic}</div>
        </div>
      </div>
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
