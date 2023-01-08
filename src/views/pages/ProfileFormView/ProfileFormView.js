import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDefaultIdentity} from '../../hooks/useDefaultIdentity';
import {useServiceContext} from '../../../contexts/ServiceContext';
import {useAccount} from '../../hooks/useAccount';
import Text from '../../components/Text';
import Button from '../../components/Button';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';
import PageTitle from '../../components/PageTitle';
import IdentitySubNav from '../../components/IdentitySubNav';

function ProfileFormView(props) {
  const {node, keymanager} = useServiceContext();
  const {balance} = useAccount();
  const defaultIdentity = useDefaultIdentity();

  const [fee, setFee] = useState(0);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);

  const [key2, setKey2] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const fee_sub = node.fee$.subscribe((d) => {
      setFee(d);
    });

    node.getFeeForAddOrUpdateIdentityTrait(
      keymanager,
      defaultIdentity,
      key2,
      value
    );

    return () => {
      fee_sub.remove();
    };
  }, [keymanager, node, defaultIdentity, key2, value]);

  function addOrUpdateIdentityTrait(keymanager, key2, value) {
    if (node.apiNotReady()) {
      setError(
        'The Fennel Node is currently unavailable. Your message did not send. Please try later.'
      );
    } else {
      node.addOrUpdateIdentityTrait(keymanager, defaultIdentity, key2, value);
      setSuccess(true);
      setError(undefined);
    }
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis px-8">
        <PageTitle>Add or Update Trait</PageTitle>
        {success && <Text>Update sent successfully.</Text>}
        {!keymanager.signer() && (
          <Text>Create or restore a Fennel account first.</Text>
        )}
        {keymanager.signer() && balance < fee && (
          <Text>Insufficient balance.</Text>
        )}
        {!defaultIdentity && <Text>Create a Fennel Identity first.</Text>}
        {visible && (
          <TransactionConfirm
            onConfirm={() => {
              setVisible(false);
              addOrUpdateIdentityTrait(keymanager, key2, value);
            }}
            onCancel={() => setVisible(false)}
          />
        )}
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        {defaultIdentity && keymanager.signer() && balance > fee && (
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
              <label htmlFor="key2">Trait Keyword</label>
              <input
                name="key2"
                value={key2}
                onChange={(event) => {
                  setKey2(event.target.value);
                }}
              />
              <label htmlFor="value">Trait Value</label>
              <input
                name="value"
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

ProfileFormView.propTypes = {
  traits: PropTypes.array
};

export default ProfileFormView;
