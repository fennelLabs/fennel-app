import React, {useState, useEffect} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';
import {useAccount} from '../../hooks/useAccount';

function Identity() {
  const account = useAccount();
  const [createIdentity, setCreateIdentity] = useState(true);
  const [btnEnabled, setBtnEnabled] = useState(false);
  const {keymanager, node} = useServiceContext();
  const [fee, setFee] = useState(0);
  const [balance, setBalance] = useState(0);
  const [visible, setVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const balance_sub = node.balance$.subscribe((d) => {
      setBalance(d);
    });
    const fee_sub = node.fee$.subscribe((d) => {
      setFee(d);
    });

    node.getBalance(keymanager);
    node.getFeeForCreateIdentity(keymanager);

    return () => {
      balance_sub.remove();
      fee_sub.remove();
    };
  }, []);

  function toggleChoice() {
    setBtnEnabled(true);
  }

  async function handleSubmit() {
    await node.createIdentity(keymanager, (identity) => {
      setCreateIdentity(identity);
      alert(`New identity number is ${identity}`);
    });
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Identity</PageTitle>
        <Text>You may use the links in the menu to manage your identity.</Text>
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
        {confirmed && (
          <Text>Request sent - wait a moment for your identity number.</Text>
        )}
        {!account && (
          <Text>Create or restore a Fennel account first.</Text>
        )}
        {account && balance < fee && (
          <Text>Insufficient balance.</Text>
        )}
        {account && balance > fee && !confirmed && (
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
                  <span className="label-text">
                    <strong>Create New Identity</strong>
                  </span>
                  <input
                    value="create"
                    type="radio"
                    name="radio"
                    className="radio checked:bg-blue-500"
                    onChange={() => setCreateIdentity(true)}
                    onClick={() => toggleChoice()}
                  />
                </label>
              </div>
              <div className="mt-2">
                {createIdentity && btnEnabled && (
                  <Button type="submit">Create Identity</Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Identity;
