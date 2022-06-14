import React from 'react';

function InboxSubNav({children, ...attributes}) {
  return (
    <ul className="menu bg-base-300 w-56 p-2 rounded-box">
      <li>
        <a href="/inbox">Inbox</a>
      </li>
      <li>
        <a href="/inbox/new">New Message</a>
      </li>
    </ul>
  );
}

export default InboxSubNav;
