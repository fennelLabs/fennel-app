import React, {useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import IdentitySubNav from '../../components/IdentitySubNav';
import Node from '../../../services/Node';
import ContactsManager from '../../../services/ContactsManager.service';
import {useServiceContext} from '../../../contexts/ServiceContext';
import {useDefaultIdentity} from '../../hooks/useDefaultIdentity';
import {usePublishKeyForm} from './usePublishKeyForm';

const node = new Node();
const contactsManager = new ContactsManager();

function PublishKey() {
  const {keymanager} = useServiceContext();
  const defaultIdentity = useDefaultIdentity();
  const [success, setSuccess] = useState(false);

  const [fingerprint, location, PublishKeyForm] = usePublishKeyForm({
    onSubmit: publishKey
  });

  async function publishKey() {
    let result = await node.announceKey(keymanager, fingerprint, location);
    if (result && defaultIdentity) {
      await contactsManager.createNewIdentity(
        defaultIdentity,
        fingerprint,
        location
      );
    }
    setSuccess(result);
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
        {defaultIdentity && PublishKeyForm}
      </div>
    </div>
  );
}

export default PublishKey;
