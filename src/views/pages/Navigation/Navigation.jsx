import React from 'react';
import './Navigation.styles.css';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav
      style={{
        borderBottom: 'solid 1px',
        paddingBottom: '1rem',
      }}
    >
      <a>brand</a>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/inbox">Inbox</Link>
    </nav>
  );
}

export default Navigation;
