import React, {useEffect, useState} from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import FeedSubNav from '../../components/FeedSubNav';
import Node from '../../../services/Node';
import FeedListView from '../../components/FeedListView';

const node = new Node();

function Feed() {
  const [signalList, setSignalList] = useState([]);

  useEffect(() => {
    const sub = node.signals$.subscribe((d) => {
      setSignalList(d);
    });

    let id = setInterval(() => {
      node.listenForSignals();
    }, 1000);

    return () => {
      sub.remove();
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
          <FeedListView itemList={signalList ?? []} />
        </div>
      </div>
    </PageContainer>
  );
}

export default Feed;
