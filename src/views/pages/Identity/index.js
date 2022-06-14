import React, { useState } from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import Node from '../../../services/Node';

function Identity() {

  const [createIdentity, setCreateIdentity] = useState(true);
  const [btnEnabled, setBtnEnabled] = useState(false);

  function toggleChoice() {
    setBtnEnabled(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const node = new Node();
    /*await*/ node.createIdentity();
    
  }

  return (
    <PageContainer>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <IdentitySubNav />
        </div>
        <div className="basis-3/4 px-8">
          <PageTitle>Identity</PageTitle>
          <Text>You may use the links in the menu to manage your identity.</Text>
          <form onSubmit={handleSubmit}>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text"><strong>Create New Identity</strong></span>
                <input value="create" type="radio" name="radio" class="radio checked:bg-blue-500" onChange={() => setCreateIdentity(true)} onClick={() => toggleChoice()} />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text"><strong>Import Identity</strong></span>
                <input value="import" type="radio" name="radio" class="radio checked:bg-blue-500" onChange={() => setCreateIdentity(false)} onClick={() => toggleChoice()} />
              </label>
            </div>
            <div className="mt-2">
              {createIdentity && btnEnabled &&
                <Button type="submit">Create Identity</Button>}

              {!createIdentity && btnEnabled &&
                <Button type="submit">Import Identity</Button>}
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}

export default Identity;
