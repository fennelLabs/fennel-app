import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function FeedSubNav({ children, ...attributes }) {
  return (
    <ul className="menu bg-base-300 w-56 p-2 rounded-box">
      <li>
        <Link to="/feed">Feed</Link>
      </li>
      <li>
        <Link to="/feed/message">New Feed Message</Link>
      </li>
    </ul>
  );
}

FeedSubNav.propTypes = {
  children: PropTypes.array
};

export default FeedSubNav;
