import React, {useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import InboxSubNav from '../../components/InboxSubNav';
import Button from '../../components/Button';
import MessageAPIService from '../../../services/MessageAPI';

function NewMessage() {
  //Insert values from the data store
  const [state, setState] = useState({
    message: '',
    public_key: '',
    signature: '',
    fingerprint: '',
    sender: null,
    recipient: null,
    message_encryption_indicator: null
  });

  const [recipientsList, setRecipientsList] = useState([]);
  const [encryptionIndicatorsList, setEncryptionsIndicatorsList] = useState([]);

  const service = new MessageAPIService();

  const handleTextChange = (e) => {
    const {name, value} = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRecipientChange = (e) => {
    const {name, value} = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleIndicatorChange = (e) => {
    const {name, value} = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitMessage = (e) => {
    e.preventDefault();
    service.sendMessage(state);
  };

  const recipients = recipientsList.map((item) => (
    <option key={item.id} value={item.fingerprint}>
      {item.fingerprint}
    </option>
  ));

  const indicators = encryptionIndicatorsList.map((item) => (
    <option key={item.id} value={item.name}>
      {item.name}
    </option>
  ));

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <InboxSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>New Message</PageTitle>
        <Text>
          Some text explaining what this is all about and what to expect.
        </Text>
        <form onSubmit={submitMessage}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Message</span>
            </label>
            <textarea
              value={state.message}
              name="message"
              onChange={handleTextChange}
              className="textarea textarea-bordered h-24"
              placeholder="..."
            ></textarea>
            <label className="label">
              <span className="label-text">Recipient</span>
            </label>
            <select name="recipient" onChange={handleRecipientChange}>
              {recipients}
            </select>
            <label className="label">
              <span className="label-text">Encryption Mode</span>
            </label>
            <select name="indicator" onChange={handleIndicatorChange}>
              {indicators}
            </select>
          </div>
          <Button type="submit" class="mt-2">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewMessage;
