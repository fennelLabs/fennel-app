import React from 'react';
import {Link, Routes, Route} from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import {WhiteflagEncode} from './Encode';

function Whiteflag() {
  return (
    <PageContainer>
      <div className="grid w-full h-full">
        <PageTitle>The Whiteflag Protocol</PageTitle>
        <Text>
          The whiteflag protocol is a messaging system for the blockchain and it
          defines various kinds of messages that can be sent. When a whiteflag
          message is created, it is encoded into a hexadecimal string and
          recorded onto the blockchain.
        </Text>
        <Text>
          Experiment with the following example:{' '}
          <ul className="list-disc">
            <li>
              Encode an authentication whiteflag message (in JSON formatting) to
              hexadecimal
            </li>
            <li>
              Decode the hexadecimal string back into the JSON authentication
              whiteflag message
            </li>
          </ul>
        </Text>
        <WhiteflagEncode />
      </div>
    </PageContainer>
  );
}

export default Whiteflag;
