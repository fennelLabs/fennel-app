import React, {useState, useEffect} from 'react';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import FeedSubNav from '../../components/FeedSubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';
import Text from '../../components/Text';
import {useAccount} from '../../hooks/useAccount';
const {decodeAddress, encodeAddress} = require('@polkadot/keyring');

const isValidAddressPolkadotAddress = () => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    return false;
  }
};

function SendToken() {
  const {node, keymanager} = useServiceContext();
  const {balance} = useAccount();

  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [fee, setFee] = useState(0);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fee_sub = node.fee$.subscribe((d) => {
      setFee(d);
    });

    // The RPC hates it if you send it an empty address.
    if (address && isValidAddressPolkadotAddress(address)) {
      node.getFeeForTransferToken(keymanager, address, amount);
      setError(undefined);
    } else if (address && address.length != 48) {
      setError('Check that the address is correct.');
    }

    return () => {
      fee_sub.remove();
    };
  }, [address, amount]);

  function transferToken(keymanager, address, amount) {
    if (node.apiNotReady()) {
      setError(
        'The Fennel Node is currently unavailable. Your transaction did not send. Please try later.'
      );
    } else {
      //Would love to try/catch here but we never actually get an error thrown if node down.
      node.transferToken(keymanager, address, amount);
      setSuccess(true);
      setError(undefined);
    }
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4"></div>
      <div className="basis-3/4 px-8">
        <PageTitle>Send UNIT</PageTitle>
        {success && <Text>Transaction sent successfully.</Text>}
        {!keymanager.signer() && (
          <Text>Create or restore a Fennel account first.</Text>
        )}
        {keymanager.signer() && balance < amount + fee && (
          <Text>Insufficient balance.</Text>
        )}
        {visible && (
          <TransactionConfirm
            onConfirm={() => {
              setVisible(false);
              transferToken(keymanager, address, amount);
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
              <input
                name="address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              <input
                name="amount"
                value={amount}
                onChange={(event) => {
                  // IF avoids a really irritating NaN problem.
                  if (event.target.value) {
                    setAmount(parseInt(event.target.value));
                  } else {
                    setAmount(0);
                  }
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

export default SendToken;
