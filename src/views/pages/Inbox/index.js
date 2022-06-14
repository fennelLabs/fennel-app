import React, {useEffect, useState} from 'react';
import MessageAPIService from '../../../services/MessageAPI';
import ListView from '../../components/ListView';
import PropTypes from 'prop-types';

const message = new MessageAPIService();

function Inbox(props) {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const sub = message.received_messages$.subscribe((d) => {
      setMessageList(d);
    });

    let id = setInterval(() => {
      message.checkMessages(props.user_identity);
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

Inbox.propTypes = {
  user_identity: PropTypes.number
};

export default Inbox;
