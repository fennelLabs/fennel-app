import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import FeedSubNav from '../../components/FeedSubNav';
import { useServiceContext } from '../../../contexts/ServiceContext';

function NewFeedMessage() {
  const { node, keymanager } = useServiceContext();

  const [value, setValue] = useState('');
  const [fee, setFee] = useState(0);
  const { balance, setBalance } = useState(0);

  useEffect(() => {
    setFee(node.getFeeForSendNewSignal(keymanager, value));
    setBalance(node.getBalance(keymanager));
  }, [value]);

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <FeedSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>New Feed Message</PageTitle>
        <Text>This action will charge an estimated network fee of {fee}.</Text>
        {balance > fee ? <form
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
        </form> : <Text>Insufficient balance.</Text>}
      </div>
    </div>
  );
}

export default NewFeedMessage;
