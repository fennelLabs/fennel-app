import React, {useState, useContext} from 'react';
import PageTitle from '../../components/PageTitle';
import IdentitySubNav from '../../components/IdentitySubNav';
import {IdentityControls} from './IdentityControls';

function Identity() {
  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Identity</PageTitle>
        <IdentityControls />
      </div>
    </div>
  );
}

export default Identity;
