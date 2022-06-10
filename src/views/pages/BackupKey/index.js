import React from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';

function BackupKey() {
  return (
    <PageContainer>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <IdentitySubNav />
        </div>
        <div className="basis-3/4 px-8">
          <PageTitle>Backup Key</PageTitle>
          <Text>
            Some text explaining what this is all about and what to expect.
          </Text>
          <Button>Backup Key</Button>
        </div>
      </div>
    </PageContainer>
  );
}

export default BackupKey;
