import React, {useEffect, useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import IdentitySubNav from '../../components/IdentitySubNav';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';
import {useServiceContext} from '../../../contexts/ServiceContext';
import {useDefaultIdentity} from '../../hooks/useDefaultIdentity';
import {useAccount} from '../../hooks/useAccount';

function RevokeKey() {
  const {node, keymanager} = useServiceContext();
  const defaultIdentity = useDefaultIdentity();
  const {balance} = useAccount();

  const [fee, setFee] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fingerprint, setFingerprint] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fee_sub = node.fee$.subscribe((d) => {
      setFee(d);
    });

    node.getFeeForRevokeKey(keymanager, fingerprint);

    return () => {
      fee_sub.remove();
    };
  }, [fingerprint]);

  function handleFingerprintChange(e) {
    const {value} = e.target;
    setFingerprint(value);
  }

  async function revokeKey() {
    let result = await node.revokeKey(keymanager, fingerprint);
    if (result && defaultIdentity) {
      // Need a contactsManager function to delete contacts.
    }
    setSuccess(result);
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Revoke Key</PageTitle>
        <Text>This action will charge an estimated network fee of {fee}.</Text>
        <Text>
          Use this page to announce that a previous key should no longer be
          used.
        </Text>
        {visible && (
          <TransactionConfirm
            onConfirm={() => {
              setConfirmed(true);
              setVisible(false);
            }}
            onCancel={() => setVisible(false)}
          />
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            revokeKey();
          }}
        >
          <div>
            <textarea
              id="fingerprint"
              value={fingerprint}
              onChange={handleFingerprintChange}
            ></textarea>
          </div>
          <button type="submit" className="btn">
            Revoke Key
          </button>
        </form>
      </div>
    </div>
  );
}

export default RevokeKey;
