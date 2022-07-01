import React from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import IdentitySubNav from '../../components/IdentitySubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';
import {useDefaultIdentity} from '../../hooks/useDefaultIdentity';

function RevokeKey() {
  const [fingerprint, setFingerprint] = useState('');
  const {node} = useServiceContext();
  const [success, setSuccess] = useState(false);
  const defaultIdentity = useDefaultIdentity();

  function handleFingerprintChange(e) {
    const {value} = e.target;
    setFingerprint(value);
  }

  async function revokeKey() {
    let result = await node.revokeKey(fingerprint);
    if (result && defaultIdentity) {
      // Need a contactsManager function to delete contacts.
    }
    setSuccess(result);
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Revoke Key</PageTitle>
        <Text>
          Some text explaining what this is all about and what to expect.
        </Text>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            revokeKey();
          }}
        >
          <div>
            <textarea
              id="fingerprint"
              value={fingerprint}
              onChange={handleFingerprintChange}
            ></textarea>
          </div>
          <button type="submit" className="btn">
            Revoke Key
          </button>
        </form>
      </div>
    </div>
  );
}

export default RevokeKey;
