import React, {useEffect, useState} from 'react';
import useFennelRPC from '../../../utils/useFennelRPC';
import {TextArea} from './TextArea';

export function WhiteflagEncode() {
  const rpc = useFennelRPC();
  const [output, setOutput] = useState(undefined);
  const [input, setInput] = useState(undefined);

  useEffect(() => {
    const sub = send_wf_encode();
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Whiteflag Demo</h1>
      <div>
        <div>
          <TextArea
            id={1}
            title="input"
            placeholder={''}
            value={input}
            onChange={(v) => {
              setInput(v);
            }}
          />
        </div>
        <div>
          <TextArea id={2} title="output" placeholder={''} value={output} />
        </div>
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
