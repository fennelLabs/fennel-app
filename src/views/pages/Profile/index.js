import React, {useEffect, useState} from 'react';
import PageTitle from '../../components/PageTitle';
import IdentitySubNav from '../../components/IdentitySubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';
import {useDefaultIdentity} from '../../hooks/useDefaultIdentity';
import ProfileListView from './ProfileListView';
import Text from '../../components/Text';

function Profile() {
  const {node} = useServiceContext();
  const [nodeApiReady, setNodeApiReady] = useState(true);
  const defaultIdentity = useDefaultIdentity();
  const [traits, setTraits] = useState([]);

  useEffect(() => {
    const sub = node.traits$.subscribe((d) => {
      setTraits(d);
    });

    if (node.apiNotReady()) {
      setNodeApiReady(false);
    } else {
      node.getIdentityTraits(defaultIdentity);
      setNodeApiReady(true);
    }

    return () => {
      sub.remove();
    };
  }, [node, defaultIdentity]);

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Profile</PageTitle>
        {!nodeApiReady && (
          <div className="error" role="alert">
            The Fennel Node is currently unavailable. Please try again later.
          </div>
        )}
        {!defaultIdentity && <Text>Create an identity first.</Text>}
        {Object.keys(traits).length > 0 && defaultIdentity && (
          <ProfileListView traits={traits} />
        )}
      </div>
    </div>
  );
}

export default Profile;
