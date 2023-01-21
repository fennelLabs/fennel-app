import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import IdentitySubNav from '../../components/IdentitySubNav';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';
import { useServiceContext } from '../../../contexts/ServiceContext';

function RevokeKey() {
  const { node, keymanager, contactsManager } = useServiceContext();

  const [fee, setFee] = useState(0);
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
  }, [fingerprint, keymanager, node]);

  function handleFingerprintChange(e) {
    const { value } = e.target;
    setFingerprint(value);
  }

  async function revokeKey() {
    let result = await node.revokeKey(keymanager, fingerprint);
    var contact_id = await contactsManager
      .getIdentityId(fingerprint)
      .then((response) => response);
    response = await contactsManager
      .revokeIdentityKey(contact_id)
      .then((response) => response);
    result = !!response;
    contactsManager.resetContacts();
    contactsManager.populateContacts();
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
              setVisible(false);
            }}
            onCancel={() => setVisible(false)}
          />
        )}
        {success && <Text>Key revoked successfully.</Text>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            revokeKey();
          }}
        >
          <div>
            <label
              htmlFor="fingerprint"
              className="form-label mb-2 text-gray-700"
            >
              Name
            </label>
            <input
              id="fingerprint"
              value={fingerprint}
              onChange={handleFingerprintChange}
              type="text"
            />
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
