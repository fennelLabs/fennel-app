import React, {useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import Node from '../../../services/Node';
import ContactsManager from '../../../services/ContactsManager.service';

const node = new Node();
const contactsManager = new ContactsManager();

function PublishKey() {
  const [success, setSuccess] = useState(false);
  const [fingerprint, setFingerprint] = useState('');
  const [location, setLocation] = useState('');

  async function publishKey(e) {
    e.preventDefault();
    let result = await node.announceKey(fingerprint, location);
    if (result) {
      await contactsManager.createNewIdentity(fingerprint, publishKey);
    }
    setSuccess(result);
  }

  function handleFingerprintChange(e) {
    const {_, value} = e.target;
    setFingerprint(value);
  }

  function handleLocationChange(e) {
    const {_, value} = e.target;
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
        <form onSubmit={publishKey}>
          <textarea
            value={fingerprint}
            onChange={handleFingerprintChange}
            className="textarea textarea-bordered h-24"
          ></textarea>
          <textarea
            value={location}
            onChange={handleLocationChange}
            className="textarea textarea-bordered h-24"
          ></textarea>
          <div className="mt-2">
            <Button type="submit">Publish Key</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PublishKey;
