import React, {useEffect, useState} from 'react';
import MessageService from '../../../services/Message.service';
import ListView from '../../components/ListView';

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
    <div>
      <h1>Inbox</h1>
      <ListView itemList={messageList ?? []} />
    </div>
  );
}

export default Inbox;
