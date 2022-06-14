import React from 'react';

function FeedSubNav({children, ...attributes}) {
  return (
    <ul className="menu bg-base-300 w-56 p-2 rounded-box">
      <li>
        <a href="/feed">Feed</a>
      </li>
      <li>
        <a href="/feed/message">New Feed Message</a>
      </li>
    </ul>
  );
}

export default FeedSubNav;
