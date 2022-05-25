import React, { useState } from "react";

function Inbox() {
  const [messageList, setMessageList] = useState([
    { id: 1, name: "message1" },
    { id: 2, name: "message2" },
    { id: 3, name: "message3" },
    { id: 4, name: "message4" },
    { id: 5, name: "message5" }
  ]);

  return (
    <div style={{ width: "90%" }}>
      {messageList.map(({ id, name }) => (
        <div key={id}>
          {name}
        </div>
      ))}
    </div>
  );
};

export default Inbox;