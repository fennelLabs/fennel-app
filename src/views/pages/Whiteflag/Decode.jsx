import React, {useEffect, useState} from 'react';
import {isHexadecimalString} from '../../../utils/isHexadecimalString';
import useFennelRPC from '../../hooks/useFennelRPC';
import {Error} from './Error';
import {TextArea} from './TextArea';

const example_wf_auth_message =
  '5746313020800000000000000000000000000000000000000000000000000000000000000000b43a3a38399d1797b7b933b0b734b9b0ba34b7b71734b73a17bbb434ba32b33630b380';

export function WhiteflagDecode() {
  const {open, rpc} = useFennelRPC();
  const [output, setOutput] = useState(undefined);
  const [input, setInput] = useState(example_wf_auth_message);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (error) {
      const validation = validate();
      setError(validation.error);
    }
  }, [input]);

  return (
    <div className="max-w-[60rem]">
      <div className="grid grid-flow-row">
        <Error>{error}</Error>
        {open && (
          <button
            className="btn"
            onClick={() => {
              const {error} = validate();
              if (error) {
                setError(error);
                return;
              }

              rpc.whiteflag_decode(input, (json) =>
                setOutput(JSON.stringify(JSON.parse(json), undefined, 4))
              );
            }}
          >
            Decode
          </button>
        )}
      </div>
      <div className="my-3 grid gap-4 md:grid-flow-col">
        <TextArea
          id={1}
          title="Authentication Whiteflag Hexadecimal Message"
          placeholder={''}
          value={input}
          onChange={(v) => {
            setInput(v);
          }}
        />
        <div className="flex flex-col">
          <label>Decoded Message</label>
          <div className="h-full py-3 md:py-0">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );

  function validate() {
    return {
      error: !isHexadecimalString(input) && 'invalid hexadecimal',
      message: undefined
    };
  }
}
