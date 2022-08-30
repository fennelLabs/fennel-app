import React from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import useFennelRPC from '../../hooks/useFennelRPC';
import {WhiteflagDecode} from './Decode';
import {WhiteflagEncode} from './Encode';

function Whiteflag() {
  const {rpc} = useFennelRPC();
  return (
    <PageContainer>
      <div className="grid w-full h-full">
        <PageTitle>The Whiteflag Protocol</PageTitle>
        <p className="text">
          The whiteflag protocol is a messaging system for the blockchain and it
          defines various kinds of messages that can be sent. When a whiteflag
          message is created, it is encoded into a hexadecimal string and
          recorded onto the blockchain.
        </p>
        <div className="text">
          Experiment with the following example:&nbsp;
          <ul className="list-disc">
            <li>Encode an authentication whiteflag message to hexadecimal</li>
            <li>
              Decode the hexadecimal string back into the JSON authentication
              whiteflag message
            </li>
          </ul>
        </div>
        <WhiteflagEncode />
        {/* <WhiteflagDecode /> */}
        <div className="grid">
          <div>
            <button
              className="btn"
              onClick={() => {
                rpc.close();
              }}
            >
              Close RPC
            </button>
          </div>
          <div>
            <button
              className="btn"
              onClick={() => {
                rpc.open();
              }}
            >
              Open RPC
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Whiteflag;
