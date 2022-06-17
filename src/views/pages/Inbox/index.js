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
      let testList = [
        {
          id: 0,
          message: '000 dolor lorum ipsum dolor lorum ipsum',
          fingerprint: 'asdfas99234js9siw2923jsakfaskasd92'
        },
        {
          id: 1,
          message:
            '111 dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum',
          fingerprint: 'asdfas99234js9siw2923jsakfaskasd92'
        },
        {
          id: 2,
          message:
            '222 dolor lorum ipsum dolor lorum ipsum  dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum dolor lorum ipsum',
          fingerprint: 'asdfas99234js9siw2923jsakfaskasd92'
        },
        {
          id: 3,
          message:
            '333 dolor lorum ipsum dolor lorum ipsum  dolor lorum ipsum dolor lorum ipsum  dolor lorum ipsum dolor lorum ipsum',
          fingerprint: 'asdfas99234js9siw2923jsakfaskasd92'
        }
      ];
      setMessageList(testList);
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
