import React from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';

function Identity() {
  return (
    <PageContainer>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <IdentitySubNav />
        </div>
        <div className="basis-3/4 px-8">
          <PageTitle>Identity</PageTitle>
          <Text>
            Splash.
          </Text>
        </div>
      </div>
    </PageContainer>
  );
}

export default Identity;
