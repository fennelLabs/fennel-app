import React, {useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import Node from '../../../services/Node';
import ContactsManager from '../../../services/ContactsManager.service';
import {useServiceContext} from '../../../contexts/ServiceContext';

const node = new Node();
const contactsManager = new ContactsManager();

function PublishKey() {
  const {keymanager} = useServiceContext();
  const [success, setSuccess] = useState(false);
  const [fingerprint, setFingerprint] = useState('');
  const [location, setLocation] = useState('');

  async function publishKey(e) {
    e.preventDefault();
    let result = await node.announceKey(keymanager, fingerprint, location);
    if (result) {
      await contactsManager.createNewIdentity(fingerprint, result);
    }
    setSuccess(result);
  }

  function handleFingerprintChange(e) {
    const {value} = e.target;
    setFingerprint(value);
  }

  function handleLocationChange(e) {
    const {value} = e.target;
    setLocation(value);
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Publish Key</PageTitle>
        {success ? (
          <Text>
            Some text explaining what this is all about and what to expect.
          </Text>
        ) : (
          <Text>Keypair published successfully.</Text>
        )}
        <form className="grid" onSubmit={publishKey}>
          <div className="form-group mb-6">
            <label htmlFor="name" className="form-label mb-2 text-gray-700">
              Name
            </label>
            <input
              id="name"
              value={location}
              onChange={handleLocationChange}
              type="text"
            />
          </div>
          <div className="grid form-group mb-6">
            <label
              htmlFor="fingerprint"
              className="form-label mb-2 text-gray-700"
            >
              Public Key
            </label>
            <textarea
              id="fingerprint"
              value={fingerprint}
              onChange={handleFingerprintChange}
              rows={5}
            ></textarea>
          </div>

          <div className="mt-2">
            <Button type="submit">Publish Key</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PublishKey;
