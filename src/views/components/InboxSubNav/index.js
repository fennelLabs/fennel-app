import React from 'react';
import {Link} from 'react-router-dom';

function InboxSubNav({children, ...attributes}) {
  return (
    <ul className="menu bg-base-300 w-56 p-2 rounded-box">
      <li>
        <Link to="/inbox">Inbox</Link>
      </li>
      <li>
        <Link to="/inbox/new">New Message</Link>
      </li>
    </ul>
  );
}

export default InboxSubNav;
