import React, {useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import {Link} from 'react-router-dom';
import IdentitySubNav from '../../components/IdentitySubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';
import {useDefaultIdentity} from '../../hooks/useDefaultIdentity';
import {usePublishKeyForm} from './usePublishKeyForm';

function PublishKey() {
  const {node, keymanager, contactsManager} = useServiceContext();
  const defaultIdentity = useDefaultIdentity();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(undefined);

  console.log(defaultIdentity);

  const [fingerprint, location, PublishKeyForm] = usePublishKeyForm({
    onSubmit: publishKey
  });

  async function publishKey() {
    try {
      let result = await node.announceKey(keymanager, fingerprint, location);
      if (result && defaultIdentity) {
        await contactsManager.createNewIdentity(
          defaultIdentity,
          fingerprint,
          location
        );
      }
      setSuccess(result);
      setError(undefined);
    } catch {
      setError(
        'Publishing your key has failed. This may be a temporary problem. If refreshing this page does not result in success, please contact:'
      );
    }
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Publish Key</PageTitle>
        {success && <Text>Keypair published successfully.</Text>}
        {defaultIdentity && PublishKeyForm}
        {defaultIdentity == undefined && (
          <Link to="/identity">
            Please create an identity before publishing you key.
          </Link>
        )}
        {error && (
          <div
            className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default PublishKey;
