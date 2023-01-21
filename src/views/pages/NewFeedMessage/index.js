import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import FeedSubNav from '../../components/FeedSubNav';
import { useServiceContext } from '../../../contexts/ServiceContext';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';
import Text from '../../components/Text';
import { useAccount } from '../../hooks/useAccount';

function NewFeedMessage() {
  const { node, keymanager } = useServiceContext();
  const { balance } = useAccount();

  const [value, setValue] = useState('');
  const [fee, setFee] = useState(0);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fee_sub = node.fee$.subscribe((d) => {
      setFee(d);
    });

    node.getFeeForSendNewSignal(keymanager, value);

    return () => {
      fee_sub.remove();
    };
  }, [value, keymanager, node]);

  function sendNewSignal(keymanager, value) {
    if (node.apiNotReady()) {
      setError(
        'The Fennel Node is currently unavailable. Your message did not send. Please try later.'
      );
    } else {
      //Would love to try/catch here but we never actually get an error thrown if node down.
      node.sendNewSignal(keymanager, value);
      setSuccess(true);
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
        {success && <Text>Message sent successfully.</Text>}
        {!keymanager.signer() && (
          <Text>Create or restore a Fennel account first.</Text>
        )}
        {keymanager.signer() && balance < fee && (
          <Text>Insufficient balance.</Text>
        )}
        {visible && (
          <TransactionConfirm
            onConfirm={() => {
              setVisible(false);
              sendNewSignal(keymanager, value);
            }}
            onCancel={() => setVisible(false)}
          />
        )}
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        {keymanager.signer() && balance > fee && (
          <div>
            <Text>
              This action will charge an estimated network fee of {fee}.
            </Text>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setVisible(true);
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
        )}
      </div>
    </div>
  );
}

export default NewFeedMessage;
