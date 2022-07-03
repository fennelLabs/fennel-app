import React, {useState} from 'react';
import PageTitle from '../../components/PageTitle';
import IdentitySubNav from '../../components/IdentitySubNav';
import useFennelRPC from '../../hooks/useFennelRPC';

function GenerateKeypair() {
  const [publicKey, setPublicKey] = useState(null);
  const {rpc} = useFennelRPC();
  const [error, setError] = useState(undefined);

  function generateKeypair() {
    try {
      rpc.generateKeypair((r) => {
        setPublicKey(r);
      });
      setError(undefined);
    } catch {
      setError(
        'Key Pair generation has failed. Please try again. If you receive this message again, please contact:'
      );
    }
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Generate Keypair</PageTitle>
        <div className="flex flex-col">
          {!publicKey ? (
            <>
              <p>
                You will now create a keypair representing an identity
                associated with your Fennel account.
              </p>
              {error && (
                <div className="error" role="alert">
                  {error}
                </div>
              )}
              <div className="mt-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => generateKeypair()}
                >
                  Generate
                </button>
              </div>
            </>
          ) : (
            <span className="mb-2">Success!</span>
          )}
          {publicKey && (
            <div className="h-full flex self-center items-center py-3 md:py-0">
              <div className="break-all max-w-[50rem]">{publicKey}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateKeypair;
