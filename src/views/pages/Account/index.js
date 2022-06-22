import React, {useState, useContext} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import Node from '../../../services/Node';
import {useServiceContext} from '../../../contexts/ServiceContext';
import {useNavigate} from 'react-router-dom';

function Account() {
  const [createAccount, setCreateAccount] = useState({createAccount: true});
  const [btnEnabled, setBtnEnabled] = useState(false);
  const [mnemonic, setMnemonic] = useState('');
  const {_, keymanager} = useServiceContext();
  const navigate = useNavigate();

  function toggleChoice() {
    setBtnEnabled(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (createAccount) {
      setMnemonic(keymanager.generateAccount('Main'));
      navigate('/identity/generate-keypair');
    } else {
      navigate('/identity/import-keypair');
    }
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Account</PageTitle>
        <p>We need to say something about what they are doing.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                <strong>Create New Account</strong>
              </span>
              <input
                value="create"
                type="radio"
                name="radio"
                className="radio checked:bg-blue-500"
                onChange={() => setCreateAccount(true)}
                onClick={() => toggleChoice()}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                <strong>Import Account</strong>
              </span>
              <input
                value="import"
                type="radio"
                name="radio"
                className="radio checked:bg-blue-500"
                onChange={() => setCreateAccount(false)}
                onClick={() => toggleChoice()}
              />
            </label>
          </div>
          {btnEnabled && (
            <div className="mt-2">
              {createAccount && <Button type="submit">Create Account</Button>}

              {!createAccount && <Button type="submit">Import Account</Button>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Account;
