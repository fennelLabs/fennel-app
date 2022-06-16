import React, {useEffect, useState} from 'react';
import {isHexadecimalString} from '../../../utils/isHexadecimalString';
import useFennelRPC from '../../../utils/useFennelRPC';
import {TextArea} from './TextArea';

const example_wf_auth_message = JSON.stringify(
  {
    prefix: 'WF',
    version: '1',
    encryptionIndicator: '0',
    duressIndicator: '0',
    messageCode: 'A',
    referenceIndicator: '0',
    referencedMessage:
      '0000000000000000000000000000000000000000000000000000000000000000',
    verificationMethod: '1',
    verificationData: 'https://organisation.int/whiteflag'
  },
  undefined,
  2
);

export function WhiteflagEncode() {
  const rpc = useFennelRPC();
  const [output, setOutput] = useState(undefined);
  const [input, setInput] = useState(example_wf_auth_message);

  useEffect(() => {
    const sub = send_wf_encode();
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <div className="h-full">
      <div>Is Hex? {isHexadecimalString(output) ? 'yes' : 'no'}</div>
      <div className="grid h-full w-full">
        <TextArea
          id={1}
          title="input"
          placeholder={''}
          value={input}
          onChange={(v) => {
            setInput(v);
          }}
        />
        {/* <TextArea id={2} title="output" placeholder={''} value={output} /> */}
        <p className="break-all">{output}</p>
      </div>

      <div style={{display: 'flex'}}>
        <div>
          <button
            className="btn"
            onClick={() => {
              send_wf_encode();
            }}
          >
            Send Auth Message
          </button>
        </div>
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
  );

  function send_wf_encode() {
    return rpc.whiteflag_encode((m) => {
      console.log('received!');
      setOutput(m);
    });
  }
}
