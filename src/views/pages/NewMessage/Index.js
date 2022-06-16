import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import InboxSubNav from '../../components/InboxSubNav';

function NewMessage() {

  const [message, setMessage] = useState({
    message: '',
    public_key: '',
    signature: '',
    fingerprint: '',
    sender: null,
    recipient: null,
    message_encryption_indicator: null
  });

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
        <form>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="..."
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewMessage;
