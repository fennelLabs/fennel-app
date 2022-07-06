import React, {useEffect, useState} from 'react';
import PageTitle from '../../components/PageTitle';
import FeedSubNav from '../../components/FeedSubNav';
import FeedListView from '../../components/FeedListView';
import {useServiceContext} from '../../../contexts/ServiceContext';
import Text from '../../components/Text';

function Feed() {
  const {node} = useServiceContext();
  const [signalList, setSignalList] = useState([]);
  const [nodeApiReady, setNodeApiReady] = useState(true);

  useEffect(() => {
    const sub = node.signals$.subscribe((d) => {
      setSignalList(d);
    });

    let id = setInterval(() => {
      if (node.apiNotReady()) {
        setNodeApiReady(false);
      } else {
        node.listenForSignals();
        setNodeApiReady(true);
      }
    }, 1000);

    return () => {
      sub.remove();
      clearInterval(id);
    };
  }, [node]);

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <FeedSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Feed</PageTitle>
        {!nodeApiReady && (
          <div className="error" role="alert">
            The Fennel Node is currently unavailable. Please try again later.
          </div>
        )}
        <FeedListView itemList={signalList ?? []} />
      </div>
    </div>
  );
}

export default Feed;
