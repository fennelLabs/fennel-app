import React from 'react';
import { Link } from 'react-router-dom';

function RatingSubNav() {
  return (
    <ul className="menu bg-base-300 w-56 p-2 rounded-box">
      <li>
        <Link to="/rating">Rating Activity</Link>
      </li>
      <li>
        <Link to="/rating/create">New Rating Signal</Link>
      </li>
      <li>
        <Link to="/rating/revoke">Revoke Rating Signal</Link>
      </li>
    </ul>
  );
}

export default RatingSubNav;
