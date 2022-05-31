import React, { useState } from "react";
import ListView from '../../components/ListView/ListView';

function Inbox() {
  const [messageList, setMessageList] = useState([
    { id: 1, name: "message1" },
    { id: 2, name: "message2" },
    { id: 3, name: "message3" },
    { id: 4, name: "message4" },
    { id: 5, name: "message5" }
  ]);

  return (
    <div>
      <h1>Inbox</h1>
      <ListView itemList={messageList} />
    </div>
  );
};

export default Inbox;