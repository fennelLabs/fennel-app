import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import { useServiceContext } from '../../../contexts/ServiceContext';

function Identity() {
  const [createIdentity, setCreateIdentity] = useState(true);
  const [btnEnabled, setBtnEnabled] = useState(false);
  const { keymanager, node } = useServiceContext();
  const [fee, setFee] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setFee(node.getFeeForCreateIdentity(keymanager));
    setBalance(node.getBalance(keymanager));
  }, []);

  function toggleChoice() {
    setBtnEnabled(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await node.createIdentity(keymanager, (identity) => {
      setCreateIdentity(identity);
      alert(`New identity number is ${identity}`);
    });
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Identity</PageTitle>
        <Text>You may use the links in the menu to manage your identity.</Text>
        <Text>This action will charge an estimated network fee of {fee}.</Text>
        {balance > fee ? <form onSubmit={handleSubmit}>
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
          <div className="mt-2">
            {createIdentity && btnEnabled && (
              <Button type="submit">Create Identity</Button>
            )}
          </div>
        </form> : <Text>Insufficient balance.</Text>}
      </div>
    </div>
  );
}

export default Identity;
