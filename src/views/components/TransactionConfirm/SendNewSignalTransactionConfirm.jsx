import React, {useEffect, useState} from 'react';
import Text from '../../components/Text';
import PropTypes from 'prop-types';

export default function SendNewSignalTransactionConfirm(props) {
  const {node, keymanager} = useServiceContext();

  const {visible, setVisible} = useState(false);
  const {fee, setFee} = useState(0);
  const {balance, setBalance} = useState(0);

  useEffect(() => {
    setFee(node.getFeeForSendNewSignal(keymanager, props.content));
    setBalance(node.getBalance(keymanager));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function confirmTransaction() {
    node.sendNewSignal(keymanager, props.content);
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
          <button
            className="btn"
            onClick={() => {
              cancelTransaction();
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <Text>
          You do not have the tokens to cover the fee for this transaction.
        </Text>
      )}
    </div>
  );
}

SendNewSignalTransactionConfirm.propTypes = {
  content: PropTypes.string
};
