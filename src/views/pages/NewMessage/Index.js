import React, {useEffect, useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import InboxSubNav from '../../components/InboxSubNav';
import Button from '../../components/Button';
import MessageAPIService from '../../../services/MessageAPI';
import ContactsManager from '../../../services/ContactsManager.service';
import MessageEncryptionIndicatorsManager from '../../../services/MessageEncryptionIndicatorsManager.service';

const service = new MessageAPIService();
const contactsManager = new ContactsManager();
const indicatorsManager = new MessageEncryptionIndicatorsManager();

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
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const sub = contactsManager.identities$.subscribe((d) => {
      setRecipientsList(d);
    });
    const indicatorsSub =
      indicatorsManager.message_encryption_indicators$.subscribe((d) => {
        setEncryptionsIndicatorsList(d);
      });

    contactsManager.populateContacts();
    indicatorsManager.populateIndicators();

    return () => {
      sub.remove();
      indicatorsSub.remove();
    };
  }, []);

  const handleTextChange = (e) => {
    const {name, value} = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSenderChange = (e) => {
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

  const submitMessage = async (e) => {
    e.preventDefault();
    if (
      await service.sendMessage(
        state.message,
        'Test',
        'Test',
        'Test',
        state.sender,
        state.recipient,
        state.message_encryption_indicator
      )
    ) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  const recipients = recipientsList.map((item) => (
    <option key={item.id} value={item.id}>
      {item.fingerprint}
    </option>
  ));

  const indicators = encryptionIndicatorsList.map((item) => (
    <option key={item.id} value={item.id}>
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
        {!success ? (
          <Text>
            Some text explaining what this is all about and what to expect.
          </Text>
        ) : (
          <Text>Message sent successfully.</Text>
        )}
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
              <option value="0" selected>
                -- Select ---
              </option>
              {recipients}
            </select>
            <label className="label">
              <span className="label-text">Sender</span>
            </label>
            <select name="sender" onChange={handleSenderChange}>
              <option value="0" selected>
                -- Select ---
              </option>
              {recipients}
            </select>
            <label className="label">
              <span className="label-text">Encryption Mode</span>
            </label>
            <select
              name="message_encryption_indicator"
              onChange={handleIndicatorChange}
            >
              <option value="0" selected>
                -- Select ---
              </option>
              {indicators}
            </select>
          </div>
          <Button type="submit" className="mt-2">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewMessage;
