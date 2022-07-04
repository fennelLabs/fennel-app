import React, {useState, useEffect} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import IdentitySubNav from '../../components/IdentitySubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';
import {useDefaultIdentity} from '../../hooks/useDefaultIdentity';
import {usePublishKeyForm} from './usePublishKeyForm';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';

function PublishKey() {
  const {node, keymanager, contactsManager} = useServiceContext();
  const defaultIdentity = useDefaultIdentity();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(undefined);
  const [confirmed, setConfirmed] = useState(false);
  const [visible, setVisible] = useState(false);

  const [fee, setFee] = useState(0);
  const [balance, setBalance] = useState(0);

  const [fingerprint, location, PublishKeyForm] = usePublishKeyForm({
    onSubmit: () => {
      console.log('Setting visibility.');
      setVisible(true);
    }
  });

  useEffect(() => {
    const balance_sub = node.balance$.subscribe((d) => {
      setBalance(d);
    });
    const fee_sub = node.fee$.subscribe((d) => {
      setFee(d);
    });

    node.getBalance(keymanager);
    node.getFeeForAnnounceKey(keymanager, fingerprint, location);

    return () => {
      balance_sub.remove();
      fee_sub.remove();
    };
  }, [fingerprint, location]);

  async function publishKey() {
    try {
      let result = await node.announceKey(keymanager, fingerprint, location);
      if (result && defaultIdentity) {
        let response = await contactsManager
          .createNewIdentity(defaultIdentity, fingerprint, location)
          .then((response) => response);
        result = !!response;
      }
      console.log(`Setting success state: ${result}`);
      setSuccess(result);
      setError(undefined);
    } catch (e) {
      console.log(e);
      console.log(`Success state unchanged.`);
      setError(
        'Publishing your key has failed. This may be a temporary problem. If refreshing this page does not result in success, please contact:'
      );
    }
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Publish Key</PageTitle>
        <Text>This action will charge an estimated network fee of {fee}.</Text>
        {error && (
          <div
            className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
            role="alert"
          >
            {error}
          </div>
        )}
        {success && <Text>Keypair published successfully.</Text>}
        {balance <= fee && defaultIdentity && (
          <Text>Insufficient balance.</Text>
        )}
        {visible && (
          <TransactionConfirm
            onConfirm={() => {
              setConfirmed(true);
              setVisible(false);
              publishKey();
            }}
            onCancel={() => setVisible(false)}
          />
        )}
        {balance > fee && defaultIdentity ? (
          PublishKeyForm
        ) : (
          <Text>
            Create an on-chain identity through the Manage Identity tab first.
          </Text>
        )}
      </div>
    </div>
  );
}

export default PublishKey;
