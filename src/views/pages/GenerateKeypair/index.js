import React from 'react';
import Button from 'react-bootstrap/Button';
import CLI from '../../../services/CLI';
import {CLI_URI} from '../../../config';
import {Client as WsClient} from 'rpc-websockets';

function GenerateKeypair() {
  async function generateKeypair() {
    ///this will move to '../../../services/CLI'
    console.log('generate key pair');

    let ws = new WsClient(CLI_URI);

    ws.on('open', async () => {
      try {
        //this fails:
        //await ws.call('help', []);
        //this fails:
        //await ws.call('fennel-cli.exe help', []);
        //Error generated:
        //{code: -32601, message: 'Method not found'}
        await ws.call('get_or_generate_keypair', []);
      } catch (err) {
        console.log(err);
      }
    });

    console.log('done');
  }

  return (
    <div>
      <h1>Generate RSA Keypair</h1>
      <Button onClick={() => generateKeypair()}>Generate Keypair</Button>
    </div>
  );
}

export default GenerateKeypair;
