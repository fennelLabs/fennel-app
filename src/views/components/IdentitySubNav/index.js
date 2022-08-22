import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function IdentitySubNav({children, ...attributes}) {
  return (
    <ul className="menu bg-base-300 w-56 p-2 rounded-box">
      <li>
        <Link to="/identity">Identity</Link>
      </li>
      <li>
        <Link to="/identity/generate-keypair">Generate Key</Link>
      </li>
      <li>
        <Link to="/identity/publish-key">Publish My Key</Link>
      </li>
      <li>
        <Link to="/identity/ipfs">IPFS</Link>
      </li>
    </ul>
  );
}

IdentitySubNav.propTypes = {
  children: PropTypes.array
};

export default IdentitySubNav;
