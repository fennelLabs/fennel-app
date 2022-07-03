import React, {useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import FeedSubNav from '../../components/FeedSubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';

function NewFeedMessage() {
  const {node, keymanager} = useServiceContext();

  const [value, setValue] = useState('');
  const [error, setError] = useState(undefined);

  function sendNewSignal(event, keymanager, value) {
    event.preventDefault();
    try {
      node.sendNewSignal(keymanager, value);
      setError(undefined);
    } catch (e) {
      setError(
        'The transmission of the message failed. Please try again later.'
      );
    }
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <FeedSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>New Feed Message</PageTitle>
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        <form
          onSubmit={(event) => {
            sendNewSignal(event, keymanager, value);
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
