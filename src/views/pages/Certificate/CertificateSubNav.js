import React from 'react';
import {Link} from 'react-router-dom';

function CertificateSubNav({children, ...attributes}) {
  return (
    <ul className="menu bg-base-300 w-56 p-2 rounded-box">
      <li>
        <Link to="/certificate">New Certificate</Link>
      </li>
    </ul>
  );
}

export default CertificateSubNav;
