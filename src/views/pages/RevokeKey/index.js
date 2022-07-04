import React, { useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';

function RevokeKey() {
  const [fee, setFee] = useState(0);
  const { balance, setBalance } = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setFee(node.getFeeForRevokeKey(keymanager, props.fingerprint));
    setBalance(node.getBalance(keymanager));
  }, []);

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Revoke Key</PageTitle>
        <Text>This action will charge an estimated network fee of {fee}.</Text>
        <Text>
          Some text explaining what this is all about and what to expect.
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
        <Button>Revoke Key</Button>
      </div>
    </div>
  );
}

export default RevokeKey;
