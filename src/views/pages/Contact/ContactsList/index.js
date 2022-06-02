import React, { useState } from "react";

function ContactsList() {
  const [contactList, setContactList] = useState([
    { id: 1, name: "contact1" },
    { id: 2, name: "contact2" },
    { id: 3, name: "contact3" },
    { id: 4, name: "contact4" },
    { id: 5, name: "contact5" }
  ]);

  return (
    <div style={{ width: "90%" }}>
      {contactList.map(({ id, name }) => (
        <div key={id}>
          {name}
        </div>
      ))}
    </div>
  );
};

export default ContactsList;