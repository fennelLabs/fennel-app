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

    if (node.apiNotReady) {
      setError(
        'The Fennel Node is currently unavailable. Your message did not send. Please try later.'
      );
    } else {
      //Would love to try/catch here but we never actually get an error thrown if node down.
      node.sendNewSignal(keymanager, value);
      setError(undefined);
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
            className="mb-2"
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
