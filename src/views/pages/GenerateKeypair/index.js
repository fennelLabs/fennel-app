import React, {useState} from 'react';
import {CLI_URI} from '../../../config';
import {Client as WsClient} from 'rpc-websockets';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import useFennelRPC from '../../../utils/useFennelRPC';

function GenerateKeypair() {
  const [publicKey, setPublicKey] = useState('');
  const rpc = useFennelRPC();

  async function generateKeypair() {
    console.log('generate key pair');

    rpc.generateKeypair((r) => {
      setPublicKey(r);
    });

    console.log('done');
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Generate Key Pair</PageTitle>
        <Text>{publicKey}</Text>
        <Button onClick={generateKeypair}>Generate</Button>
      </div>
    </div>
  );
}

export default GenerateKeypair;
