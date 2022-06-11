import React from 'react';
import CLI from '../../../services/CLI';
import {CLI_URI} from '../../../config';
import {Client as WsClient} from 'rpc-websockets';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';

function GenerateKeypair() {
  async function generateKeypair() {
    ///this will move to '../../../services/CLI'
    console.log('generate key pair');

    let ws = new WsClient(CLI_URI);

    ws.on('open', async () => {
      try {
        await ws.call('get_or_generate_keypair', []);
      } catch (err) {
        console.log(err);
      }
    });

    console.log('done');
  }

  return (
    <PageContainer>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <IdentitySubNav />
        </div>
        <div className="basis-3/4 px-8">
          <PageTitle>Generate Key Pair</PageTitle>
          <Text>
            Some text explaining what this is all about and what to expect.
          </Text>
          <Button onClick={generateKeypair}>Generate</Button>
        </div>
      </div>
    </PageContainer>
  );
}

export default GenerateKeypair;
