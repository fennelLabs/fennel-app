import React, {useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import FeedSubNav from '../../components/FeedSubNav';
import useModal from '../../../utils/useModal';
import {useServiceContext} from '../../../contexts/ServiceContext';

function NewFeedMessage() {
  const {node, keymanager} = useServiceContext();

  const [value, setValue] = useState('');
  const {open, close} = useModal('TransactionConfirm');

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <FeedSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>New Feed Message</PageTitle>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            node.sendNewSignal(keymanager, value);
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
