import React, {useEffect, useState} from 'react';
import ListView from '../../components/ListView';
import PageTitle from '../../components/PageTitle';
import InboxSubNav from '../../components/InboxSubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';
import {useDefaultSender} from '../../hooks/useDefaultSender';

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

function Inbox() {
  const {messageService} = useServiceContext();
  const [messageList, setMessageList] = useState(null);
  const defaultSender = useDefaultSender();

  useEffect(() => {
    const sub = messageService.received_messages$.subscribe((d) => {
      setMessageList(d && d.length > 0 ? d : null);
    });

    console.log(`Getting messages for ${defaultSender}`);
    if (!!defaultSender) {
      // This doesn't do what the pipe line does.
      // In the case that defaultSender is undefined,
      // which is what happens if that pipe doesn't filter anything
      // and therefore doesn't setDefaultSender, this guy stops us
      // from trying to call the API with `undefined` as an argument.
      // This therefore stops the entire message retrieve process from
      // erroring out.
      messageService.checkMessages(defaultSender);
    }

    return () => {
      sub.remove();
    };
  }, [defaultSender, messageService]);

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

export default Inbox;
