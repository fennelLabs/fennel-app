import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import CertificateSubNav from './CertificateSubNav';
import { useServiceContext } from '../../../contexts/ServiceContext';
import TransactionConfirm from '../../../addons/Modal/TransactionConfirm';
import { useAccount } from '../../hooks/useAccount';

function Certificate() {
  const { account, balance } = useAccount();
  const [success, setSuccess] = useState(false);
  const { keymanager, node } = useServiceContext();
  const [fee, setFee] = useState(0);
  const [visible, setVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [target, setTarget] = useState('');

  useEffect(() => {
    const fee_sub = node.fee$.subscribe((d) => {
      setFee(d);
    });

    node.getFeeForSendCertificate(keymanager);

    return () => {
      fee_sub.remove();
    };
  }, [keymanager, node]);

  async function handleSubmit() {
    await node.sendCertificate(keymanager, target);
    setSuccess(true);
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <CertificateSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Create New Certificate</PageTitle>
        <Text>
          You may use the links in the menu to manage your certificates.
        </Text>
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
        {confirmed && <Text>Request sent.</Text>}
        {success && <Text>New certificate created!</Text>}
        {!account && <Text>Create or restore a Fennel account first.</Text>}
        {account && balance < fee && <Text>Insufficient balance.</Text>}
        {account && balance > fee && (
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
                  <label htmlFor="target">Target Address</label>
                  <input
                    value={target}
                    name="target"
                    onChange={(e) => setTarget(e.value)}
                  />
                </label>
              </div>
              <div className="mt-2">
                <Button type="submit">Create Certificate</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Certificate;
