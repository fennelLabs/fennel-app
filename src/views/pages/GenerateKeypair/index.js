import React from 'react';
import Button from 'react-bootstrap/Button';
import CLI from '../../../services/CLI';
import { CLI_URI } from '../../../config';
import axios from 'axios';

function GenerateKeypair() {

  async function generateKeypair() {
    console.log('generate key pair');
    const cli = new CLI();
    const response = await axios.post(CLI_URI, {
        jsonrpc: '2.0',
        id: + new Date(),
        method: 'eth_accounts',
        params: {
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      })
  }

  return (
    <div>
      <h1>Generate RSA Keypair</h1>
      <Button onClick={() => generateKeypair()}>Generate Keypair</Button>
    </div>
  );
}

export default GenerateKeypair;
