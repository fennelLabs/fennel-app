import React, {useEffect, useState} from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import FeedSubNav from '../../components/FeedSubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';

function Feed() {
  const {messageService} = useServiceContext();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const sub = messageService.messages$.subscribe((message) => {
      setMessages(message.map((m) => JSON.stringify(m)) ?? []);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

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
          <div>
            {React.Children.toArray(messages.map((m) => <div>{m}</div>))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Feed;
