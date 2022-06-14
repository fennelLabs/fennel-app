import React, {useEffect} from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import FeedSubNav from '../../components/FeedSubNav';
import Node from '../../../services/Node';

const node = new Node();

function Feed() {
  useEffect(() => {
    let id = setInterval(() => {
      node.listenForSignals();
    }, 1000);

    return () => {
      clearInterval(id);
    };
  });

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
