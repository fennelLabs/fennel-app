import React, {useState} from 'react';
import IdentitySubNav from '../../components/IdentitySubNav';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import {useNavigate} from 'react-router-dom';

function ImportKeypair() {
  const [state, setState] = useState({useJson: true, isComplete: false});
  const [btnEnabled, setBtnEnabled] = useState(false);
  const navigate = useNavigate();

  function handleStateChange(o) {
    setState((prevState) => ({
      ...prevState,
      ...o
    }));
  }

  function toggleChoice() {
    setBtnEnabled(true);
  }

  handleSubmit = () => {
    e.preventDefault();
    if (state.useJson) {
      console.log('import json');
      navigate('/');
    } else {
      console.log('import phrase');
      navigate('/');
    }
  };

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Import Keypair</PageTitle>
        {state.isComplete && (
          <form onSubmit={handleSubmit}>
            <textarea
              cols="50"
              className="textarea textarea-bordered"
              placeholder=""
              name="keypair"
            ></textarea>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  <strong>Seed Phrase</strong>
                </span>
                <input
                  value="phrase"
                  type="radio"
                  name="radio"
                  className="radio checked:bg-blue-500"
                  onChange={() => handleStateChange({useJson: false})}
                  onClick={() => toggleChoice()}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  <strong>JSON</strong>
                </span>
                <input
                  value="json"
                  type="radio"
                  name="radio"
                  className="radio checked:bg-blue-500"
                  onChange={() => handleStateChange({useJson: true})}
                  onClick={() => toggleChoice()}
                />
              </label>
            </div>
            <div className="mt-2">
              {btnEnabled && <Button type="submit">Import</Button>}
            </div>
          </form>
        ) ? (
          <>Complete</>
        ) : null}
      </div>
    </div>
  );
}

export default ImportKeypair;
