import React, {useState, useContext} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import Node from '../../../services/Node';
import {useServiceContext} from '../../../contexts/ServiceContext';

function Account() {
  const [createAccount, setCreateAccount] = useState(true);
  const [btnEnabled, setBtnEnabled] = useState(false);

  function toggleChoice() {
    setBtnEnabled(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Create the account');
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Account</PageTitle>
        <p>
          Things to consider: people think they are creating an fennel account
          then suddenly they are creating a wallet and wallet usually means
          money when an account does not. Something to consider.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                <strong>Create New Wallet (or account?)</strong>
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
                <strong>Import Wallet (or account?)</strong>
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
          <div className="mt-2">
            {createAccount && btnEnabled && (
              <Button type="submit">Create Wallet</Button>
            )}

            {!createAccount && btnEnabled && (
              <Button type="submit">Import Wallet</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
