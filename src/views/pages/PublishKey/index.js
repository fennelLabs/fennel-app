import React from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';

function PublishKey() {
  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Publish Key</PageTitle>
        <Text>
          Some text explaining what this is all about and what to expect.
        </Text>
        <Button>Publish Key</Button>
      </div>
    </div>
  );
}

export default PublishKey;
