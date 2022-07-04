import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';

function Identity() {
  const [createIdentity, setCreateIdentity] = useState(true);
  const [btnEnabled, setBtnEnabled] = useState(false);
  const {keymanager, node} = useServiceContext();
  const [confirmed, setConfirmed] = useState(false);
  const [visible, setVisible] = useState(false);

  function toggleChoice() {
    setBtnEnabled(true);
  }

  async function handleSubmit() {
    if (confirmed) {
      await node.createIdentity(keymanager, (identity) => {
        setCreateIdentity(identity);
        alert(`New identity number is ${identity}`);
      });
    }
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Identity</PageTitle>
        <Text>You may use the links in the menu to manage your identity.</Text>
        {visible && (
          <TransactionConfirm
            onConfirm={() => {
              setConfirmed(true);
              setVisible(false);
              handleSubmit();
            }}
            onCancel={() => setVisible(false)}
          />
        )}
        <form onSubmit={() => setVisible(true)}>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                <strong>Create New Identity</strong>
              </span>
              <input
                value="create"
                type="radio"
                name="radio"
                className="radio checked:bg-blue-500"
                onChange={() => setCreateIdentity(true)}
                onClick={() => toggleChoice()}
              />
            </label>
          </div>
          {/* <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                <strong>Import Identity</strong>
              </span>
              <input
                value="import"
                type="radio"
                name="radio"
                className="radio checked:bg-blue-500"
                onChange={() => setCreateIdentity(false)}
                onClick={() => toggleChoice()}
              />
            </label>
          </div> */}
          <div className="mt-2">
            {createIdentity && btnEnabled && (
              <Button type="submit">Create Identity</Button>
            )}

            {/* {!createIdentity && btnEnabled && (
              <Button type="submit">Import Identity</Button>
            )} */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Identity;
