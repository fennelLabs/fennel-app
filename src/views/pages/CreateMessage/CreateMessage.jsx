import React, {useState} from 'react';

function CreateMessage() {
  return (
    <div>
      <h1>New Message</h1>
      <textarea name="new_message" rows={5} cols={5} />
      <button type="submit" />
    </div>
  );
}

export default CreateMessage;
