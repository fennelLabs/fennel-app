import React, {useEffect, useState} from 'react';
import MessageAPIService from '../../../services/MessageAPI';
import ListView from '../../components/ListView';

const message = new MessageAPIService();

function Inbox() {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const sub = message.received_messages$.subscribe((d) => {
      setMessageList(d);
    });

    message.checkMessages();

    return () => {
      sub.remove();
    };
  }, []);

  return (
    <div>
      <h1>Inbox</h1>
      <ListView itemList={messageList ?? []} />
    </div>
  );
}

export default Inbox;
