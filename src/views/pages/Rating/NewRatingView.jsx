import React, {useState, useEffect} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import RatingSubNav from './RatingSubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';
import {useAccount} from '../../hooks/useAccount';

function NewRatingView() {
  const {account, balance} = useAccount();
  const [success, setSuccess] = useState(false);
  const {keymanager, node} = useServiceContext();
  const [fee, setFee] = useState(0);
  const [visible, setVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [target, setTarget] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fee_sub = node.fee$.subscribe((d) => {
      setFee(d);
    });

    node.getFeeForSendRatingSignal(keymanager, target, rating);

    return () => {
      fee_sub.remove();
    };
  }, [keymanager, node, target, rating]);

  async function handleSubmit() {
    console.log(target);
    console.log(rating);
    await node.sendRatingSignal(keymanager, target, rating);
    setSuccess(true);
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <RatingSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Create New Rating Signal</PageTitle>
        <Text>
          You may use the links in the menu to manage your rating signals.
        </Text>
        {visible && (
          <TransactionConfirm
            onConfirm={() => {
              setConfirmed(true);
              setVisible(false);
              handleSubmit();
            }}
            onCancel={() => setVisible(false)}
          />
        )}
        {confirmed && <Text>Request sent.</Text>}
        {success && <Text>New rating signal sent!</Text>}
        {!account && <Text>Create or restore a Fennel account first.</Text>}
        {account && balance < fee && <Text>Insufficient balance.</Text>}
        {account && balance > fee && (
          <div>
            <Text>
              This action will charge an estimated network fee of {fee}.
            </Text>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setVisible(true);
              }}
            >
              <div className="form-control">
                <label className="label cursor-pointer">
                  <div>
                    <label htmlFor="target">Target Hash</label>
                    <input
                      value={target}
                      name="target"
                      onChange={(e) => {
                        setTarget(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="rating">Rating</label>
                    <input
                      value={rating}
                      name="rating"
                      type="number"
                      onChange={(e) => {
                        setRating(e.target.value);
                      }}
                    />
                  </div>
                </label>
              </div>
              <div className="mt-2">
                <Button type="submit">Create Rating Signal</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewRatingView;
