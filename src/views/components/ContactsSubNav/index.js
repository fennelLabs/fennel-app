import React from 'react';
import {Link} from 'react-router-dom';

function ContactsSubNav({children, ...attributes}) {
  return (
    <ul className="menu bg-base-300 w-56 p-2 rounded-box">
      <li>
        <Link to="/contacts">List Contacts</Link>
      </li>
      <li>
        <Link to="/contacts/add">Add Contacts</Link>
      </li>
    </ul>
  );
}

export default ContactsSubNav;
