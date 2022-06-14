import React from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import FeedSubNav from '../../components/FeedSubNav';

function Feed() {
  return (
    <PageContainer>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <FeedSubNav />
        </div>
        <div className="basis-3/4 px-8">
          <PageTitle>Feed</PageTitle>
          <Text>
            Some text explaining what this is all about and what to expect.
          </Text>
        </div>
      </div>
    </PageContainer>
  );
}

export default Feed;
