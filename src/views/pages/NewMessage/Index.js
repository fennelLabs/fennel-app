import React from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import InboxSubNav from '../../components/InboxSubNav';

function NewMessage() {
  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <InboxSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>New Message</PageTitle>
        <Text>
          Some text explaining what this is all about and what to expect.
        </Text>
      </div>
    </div>
  );
}

export default NewMessage;
