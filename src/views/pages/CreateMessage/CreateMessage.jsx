import React, { useState } from "react";

function Inbox() {
  return (
    <div>
      <h1>New Message</h1>
      <textarea name="new_message" rows={5} cols={5} />
      <button type="submit" />
    </div>
  );
};

export default Inbox;