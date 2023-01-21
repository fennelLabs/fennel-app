import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CertificateSubNav({ children, ...attributes }) {
  return (
    <ul className="menu bg-base-300 w-56 p-2 rounded-box">
      <li>
        <Link to="/certificate">New Certificate</Link>
      </li>
      <li>
        <Link to="/certificate/list">Certificates</Link>
      </li>
      <li>
        <Link to="/certificate/revoke">Revoke Certificate</Link>
      </li>
    </ul>
  );
}

CertificateSubNav.propTypes = {
  children: PropTypes.array
};

export default CertificateSubNav;
