import React, {useState, useContext} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import Node from '../../../services/Node';
import {useServiceContext} from '../../../contexts/ServiceContext';
import {useNavigate} from 'react-router-dom';

function Account() {
  const [state, setState] = useState({createAccount: true});
  const [btnEnabled, setBtnEnabled] = useState(false);
  const navigate = useNavigate();

  function handleStateChange(o) {
    setState((prevState) => ({
      ...prevState,
      o
    }));
  }

  function toggleChoice() {
    setBtnEnabled(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (state.createAccount) {
      console.log('Create the account here, then redirect');
      navigate('/identity/generate-keypair'); //redirect to maybe inbox or something else if they have account?
    } else {
      navigate('/');
    }
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Account</PageTitle>
        <p>We need to say something about what they are doing.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                <strong>Create New Account</strong>
              </span>
              <input
                value="create"
                type="radio"
                name="radio"
                className="radio checked:bg-blue-500"
                onChange={() => handleStateChange({createAccount: true})}
                onClick={() => toggleChoice()}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                <strong>Import Account</strong>
              </span>
              <input
                value="import"
                type="radio"
                name="radio"
                className="radio checked:bg-blue-500"
                onChange={() => handleStateChange({createAccount: false})}
                onClick={() => toggleChoice()}
              />
            </label>
          </div>
          <div className="mt-2">
            {state.createAccount && btnEnabled && (
              <Button type="submit">Create Account</Button>
            )}

            {!state.createAccount && btnEnabled && (
              <Button type="submit">Import Account</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
