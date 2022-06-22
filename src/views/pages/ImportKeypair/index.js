import React, {useState} from 'react';
import IdentitySubNav from '../../components/IdentitySubNav';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import {useNavigate} from 'react-router-dom';
import {useServiceContext} from '../../../contexts/ServiceContext';

function ImportKeypair() {
  const navigate = useNavigate();
  const [mnemonic, setMnemonic] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [key, setKey] = useState('');
  const {_, keymanager} = useServiceContext();

  handleSubmit = (e) => {
    e.preventDefault();
    setMnemonic(keymanager.importAccount('Main', key));
    setIsComplete(true);
  };

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Import Account</PageTitle>
        {!isComplete ? (
          <form onSubmit={handleSubmit}>
            <textarea
              cols="50"
              className="textarea textarea-bordered"
              placeholder=""
              name="keypair"
              onChange={(event) => setKey(event.target.value)}
            ></textarea>
            <div className="mt-2">
              {key && <Button type="submit">Import</Button>}
            </div>
          </form>
        ) : (
          <span>Complete: {mnemonic}</span>
        )}
      </div>
    </div>
  );
}

export default ImportKeypair;
