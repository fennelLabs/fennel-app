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

    // TODO checkMessages needs to pull its argument from our current identity.
    // TODO Why is it pulling messages twice?
    let id = setInterval(() => {
       message.checkMessages(1);
    }, 5000);

    return () => {
      sub.remove();
      clearInterval(id);
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
