import React, { useEffect, useState } from 'react';
import ListView from '../../components/ListView';
import PageTitle from '../../components/PageTitle';
import InboxSubNav from '../../components/InboxSubNav';
import { useServiceContext } from '../../../contexts/ServiceContext';
import { useDefaultSender } from '../../hooks/useDefaultSender';

function Inbox() {
  const { messageService } = useServiceContext();
  const [messageList, setMessageList] = useState(null);
  const defaultSender = useDefaultSender();

  useEffect(() => {
    const sub = messageService.received_messages$.subscribe((messages) => {
      setMessageList(messages);
    });

    if (!!defaultSender) {
      console.log('Checking messages for', defaultSender);
      messageService.checkMessages(defaultSender);
    }

    return () => {
      sub.unsubscribe();
    };
  }, [defaultSender, messageService]);

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <InboxSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Inbox</PageTitle>
        <ListView itemList={messageList ?? []} />
      </div>
    </div>
  );
}

export default Inbox;
