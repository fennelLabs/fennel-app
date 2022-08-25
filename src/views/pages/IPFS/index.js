import React, {useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IdentitySubNav from '../../components/IdentitySubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';

function IPFS() {
  //Insert values from the data store
  const [text, setText] = useState('');
  const [cid, setCID] = useState('');
  const [success, setSuccess] = useState(false);

  const {ipfs} = useServiceContext();

  const handleTextChange = (e) => {
    const {value} = e.target;
    setText(value);
  };

  const handleCIDChange = (e) => {
    const {value} = e.target;
    setCID(value);
  };

  const submitText = async (e) => {
    e.preventDefault();
    let key = await ipfs.putFile(text);
    console.debug(key);
    if (key) {
      console.debug('Text submitted successfully.');
      setSuccess(true);
      setCID(key);
    } else {
      console.debug('Text did not submit successfully.');
      setSuccess(false);
    }
  };

  const submitCID = async (e) => {
    e.preventDefault();
    let file = await ipfs.getFile(cid);
    if (file) {
      setSuccess(true);
      setText(file);
    } else {
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <IdentitySubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>IPFS</PageTitle>
        {!success ? (
          <Text>
            Some text explaining what this is all about and what to expect.
          </Text>
        ) : (
          <Text>Message sent successfully.</Text>
        )}
        <form onSubmit={submitCID}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">CID</span>
            </label>
            <textarea
              value={cid}
              name="message"
              onChange={handleCIDChange}
              className="textarea textarea-bordered h-24"
              placeholder="..."
            ></textarea>
          </div>
          <Button type="submit" className="mt-2">
            Get File
          </Button>
        </form>

        <form onSubmit={submitText}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Text</span>
            </label>
            <textarea
              value={text}
              name="message"
              onChange={handleTextChange}
              className="textarea textarea-bordered h-24"
              placeholder="..."
            ></textarea>
          </div>
          <Button type="submit" className="mt-2">
            Save File
          </Button>
        </form>
      </div>
    </div>
  );
}

export default IPFS;
