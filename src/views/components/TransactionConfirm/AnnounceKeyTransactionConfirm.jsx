import React, {useEffect, useState} from 'react';
import Text from '../../components/Text';
import PropTypes from 'prop-types';

export default function AnnounceKeyTransactionConfirm(props) {
  const {node, keymanager} = useServiceContext();

  const {visible, setVisible} = useState(false);
  const {fee, setFee} = useState(0);

  useEffect(() => {
    setFee(
      node.getFeeForAnnounceKey(keymanager, props.fingerprint, props.location)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function confirmTransaction() {
    node.announceKey(keymanager, props.fingerprint, props.location);
  }

  function cancelTransaction() {
    setVisible(false);
  }

  return (
    <div>
      <Text>Substrate Transaction</Text>
      <Text>
        You are about to submit a Fennel transaction with an estimated cost of{' '}
        {fee}.
      </Text>
      <div>
        <button
          className="btn"
          onClick={() => {
            confirmTransaction();
          }}
        >
          Confirm
        </button>
        <button
          className="btn"
          onClick={() => {
            cancelTransaction();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

AnnounceKeyTransactionConfirm.propTypes = {
  fingerprint: PropTypes.string,
  location: PropTypes.string
};
