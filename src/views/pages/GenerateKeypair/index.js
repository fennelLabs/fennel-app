import React, {useState} from 'react';
import {CLI_URI} from '../../../config';
import {Client as WsClient} from 'rpc-websockets';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import useFennelRPC from '../../hooks/useFennelRPC';

function GenerateKeypair() {
  const [state, setState] = useState({publicKey: null});
  const {rpc} = useFennelRPC();

  function handleStateChange(o) {
    console.log(o);
    setState((prevState) => ({
      ...prevState,
      ...o
    }));
  }

  async function generateKeypair(e) {
    e.preventDefault();
    console.log('generate key pair');
    handleStateChange({publicKey: 'asdf'});

    //rpc.generateKeypair((r) => {
    //  handleStateChange({publicKey: r});
    //});
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Generate Keypair</PageTitle>
        <Text>{state.publicKey}</Text>
        {state.publicKey == null ? (
          <div>
            <p>
              You will now create a keypair representing an identity associated
              with your Fennel account.
            </p>
            <form onSubmit={generateKeypair}>
              <div className="mt-2">
                <Button type="submit">Generate</Button>
              </div>
            </form>
          </div>
        ) : (
          <span>Success!</span>
        )}
      </div>
    </div>
  );
}

export default GenerateKeypair;
