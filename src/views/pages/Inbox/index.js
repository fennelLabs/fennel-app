import React, {useEffect, useState} from 'react';
import MessageService from '../../../services/Message.service';
import ListView from '../../components/ListView';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import InboxSubNav from '../../components/InboxSubNav';

const message = new MessageService();

function Inbox() {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const sub = message.messages$.subscribe((d) => {
      setMessageList(d);
    });

    return () => {
      sub.remove();
    };
  }, []);

  return (
    <PageContainer>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <InboxSubNav />
        </div>
        <div className="basis-3/4 px-8">
        <PageTitle>Inbox</PageTitle>
          <ListView itemList={messageList ?? []} />
        </div>
      </div>
    </PageContainer>
  );
}

export default Inbox;
