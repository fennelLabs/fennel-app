import React, {useEffect, useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import InboxSubNav from '../../components/InboxSubNav';
import Button from '../../components/Button';
import MessageEncryptionIndicatorsManager from '../../../services/MessageEncryptionIndicatorsManager.service';
import {useDefaultSender} from '../../hooks/useDefaultSender';
import {useServiceContext} from '../../../contexts/ServiceContext';

const indicatorsManager = new MessageEncryptionIndicatorsManager();

function NewMessage() {
  //Insert values from the data store
  const [state, setState] = useState({
    message: '',
    public_key: '',
    signature: '',
    fingerprint: '',
    sender: null,
    message_encryption_indicator: null
  });

  const [recipient, setRecipient] = useState(null);

  const {contactsManager, messageService} = useServiceContext();
  const defaultSender = useDefaultSender();
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

  useEffect(() => {
    if (recipient && recipient > 0) {
      console.log('recipient is: ', recipient);
      contactsManager
        .getContactKey(recipient)
        .then((key) => {
          setState((prevState) => ({
            ...prevState,
            fingerprint: key.fingerprint,
            public_key: key.public_key
          }));
        })
        .catch(console.error);
    }
  }, [recipient]);

  const handleTextChange = (e) => {
    const {name, value} = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRecipientChange = (e) => {
    const {value} = e.target;
    setRecipient(value);
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
    setSuccess(
      await messageService.sendMessage(
        state.message,
        state.fingerprint,
        await messageService.signMessage(state.message),
        state.public_key,
        parseInt(defaultSender),
        recipient,
        state.message_encryption_indicator
      )
    );
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
        {defaultSender ? (
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
              <select
                name="recipient"
                onChange={handleRecipientChange}
                defaultValue="0"
              >
                <option value="0">-- Select ---</option>
                {recipients}
              </select>
              <label className="label">
                <span className="label-text">Encryption Mode</span>
              </label>
              <select
                name="message_encryption_indicator"
                onChange={handleIndicatorChange}
                defaultValue="0"
              >
                <option value="0">-- Select ---</option>
                {indicators}
              </select>
            </div>
            <Button type="submit" className="mt-2">
              Send Message
            </Button>
          </form>
        ) : (
          <Text>Please create an identity to send a new message.</Text>
        )}
      </div>
    </div>
  );
}

export default NewMessage;
