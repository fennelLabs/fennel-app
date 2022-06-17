import React, {useEffect, useState} from 'react';
import useFennelRPC from '../../../utils/useFennelRPC';
import {Error} from './Error';
import {TextArea} from './TextArea';

const example_wf_auth_message = {
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
};

export function WhiteflagEncode() {
  const rpc = useFennelRPC();
  const [output, setOutput] = useState(undefined);
  const [input, setInput] = useState(formatJSON(example_wf_auth_message));
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (error) {
      const validation = validate();
      setError(validation.error);
    }
  }, [input]);

  return (
    <div>
      <div className="grid grid-flow-row">
        <Error>{error}</Error>
        <button
          className="btn"
          onClick={() => {
            const {error, message} = validate();
            if (error) {
              setError(error);
              return;
            }

            rpc.whiteflag_encode(message, (hexadecimal) =>
              setOutput(hexadecimal)
            );
          }}
        >
          Encode
        </button>
      </div>
      <div className="my-3 grid gap-4 md:grid-flow-col">
        <TextArea
          id={1}
          title="Authentication Whiteflag Message"
          placeholder={''}
          value={ensureInputIsString()}
          onChange={(v) => {
            setInput(v);
          }}
        />
        <div className="flex flex-col">
          <label>Hexadecimal Encoded Message</label>
          <div className="h-full flex self-center items-center py-3 md:py-0">
            <div className="break-all w-[15rem]">{output}</div>
          </div>
        </div>
      </div>
    </div>
  );

  function validate() {
    try {
      const message = JSON.parse(input);
      return {error: undefined, message};
    } catch (e) {
      return {error: 'invalid json', message: undefined};
    }
  }

  function ensureInputIsString() {
    if (typeof input === typeof 'string') {
      return input;
    }

    return JSON.stringify(input, undefined, 2);
  }
}

function formatJSON(json) {
  return JSON.stringify(json, undefined, 2);
}
