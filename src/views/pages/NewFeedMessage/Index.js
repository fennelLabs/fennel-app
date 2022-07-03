import React, {useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import FeedSubNav from '../../components/FeedSubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';

function NewFeedMessage() {
  const {node, keymanager} = useServiceContext();

  const [value, setValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <FeedSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>New Feed Message</PageTitle>{' '}
        {visible && (
          <TransactionConfirm
            onConfirm={() => {
              setConfirmed(true);
              setVisible(false);
              node.sendNewSignal(keymanager, value);
            }}
            onCancel={() => setVisible(false)}
          />
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!confirmed) {
              setVisible(true);
            }
          }}
        >
          <textarea
            name="new_message"
            rows={5}
            cols={5}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default NewFeedMessage;
