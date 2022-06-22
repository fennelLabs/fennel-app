import React, {useEffect, useState} from 'react';
import ListView from '../../components/ListView';
import PropTypes from 'prop-types';
import PageTitle from '../../components/PageTitle';
import InboxSubNav from '../../components/InboxSubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';

const test_messages = [
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

function Inbox(props) {
  const {messageService} = useServiceContext();
  const [messageList, setMessageList] = useState(null);

  useEffect(() => {
    const sub = messageService.received_messages$.subscribe((d) => {
      setMessageList(d && d.length > 0 ? d : null);
    });

    let id = setInterval(() => {
      messageService.checkMessages(props.user_identity);
    }, 5000);

    return () => {
      sub.remove();
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    messageService.checkMessages(props.user_identity);
  }, [props.user_identity]);

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <InboxSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Inbox</PageTitle>
        {!messageList && (
          <button className="btn" onClick={() => setMessageList(test_messages)}>
            Load Test Messages
          </button>
        )}
        <ListView itemList={messageList ?? []} />
      </div>
    </div>
  );
}

Inbox.propTypes = {
  user_identity: PropTypes.number
};

export default Inbox;
