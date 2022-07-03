import React, {useState, useContext} from 'react';
import Text from '../../components/Text';
import Button from '../../components/Button';
import {useServiceContext} from '../../../contexts/ServiceContext';

export function IdentityControls(_) {
  const [createIdentity, setCreateIdentity] = useState(true);
  const [btnEnabled, setBtnEnabled] = useState(false);
  const {keymanager, node} = useServiceContext();

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
    <>
      <Text>You may use the links in the menu to manage your identity.</Text>
      <form onSubmit={handleSubmit}>
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
    </>
  );
}
