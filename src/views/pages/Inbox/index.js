import React, {useEffect, useState} from 'react';
import MessageAPIService from '../../../services/MessageAPI';
import ListView from '../../components/ListView';
import PropTypes from 'prop-types';
import PageTitle from '../../components/PageTitle';
import InboxSubNav from '../../components/InboxSubNav';

const message = new MessageAPIService();

function Inbox(props) {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const sub = message.received_messages$.subscribe((d) => {
      setMessageList(d);
    });

    message.checkMessages(props.user_identity);

    let id = setInterval(() => {
      message.checkMessages(props.user_identity);
    }, 5000);

    return () => {
      sub.remove();
      clearInterval(id);
    };
  }, [props.user_identity]);

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

Inbox.propTypes = {
  user_identity: PropTypes.number
};

export default Inbox;
