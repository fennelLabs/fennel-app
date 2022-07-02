import React, {useEffect, useState} from 'react';
import Text from '../../components/Text';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default function AnnounceKeyTransactionConfirm(props) {
  const {node, keymanager} = useServiceContext();

  const {fee, setFee} = useState(0);
  const {balance, setBalance} = useState(0);

  useEffect(() => {
    setFee(
      node.getFeeForAnnounceKey(keymanager, props.fingerprint, props.location)
    );
    setBalance(node.getBalance(keymanager));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function confirmTransaction() {
    node.announceKey(keymanager, props.fingerprint, props.location);
  }

  return (
    <div>
      <Text>Substrate Transaction</Text>
      <Text>
        You are about to submit a Fennel transaction with an estimated cost of{' '}
        {fee}.
      </Text>
      {balance > fee ? (
        <div>
          <button
            className="btn"
            onClick={() => {
              confirmTransaction();
            }}
          >
            Confirm
          </button>
          <Link className="btn" to="/identity/publish-key">
            Cancel
          </Link>
        </div>
      ) : (
        <Text>
          You do not have the tokens to cover the fee for this transaction.
        </Text>
      )}
    </div>
  );
}

AnnounceKeyTransactionConfirm.propTypes = {
  fingerprint: PropTypes.string,
  location: PropTypes.string
};
