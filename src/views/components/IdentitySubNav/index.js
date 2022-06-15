import React from 'react';
import {Link} from 'react-router-dom';

function IdentitySubNav({children, ...attributes}) {
  return (
    <ul className="menu bg-base-300 w-56 p-2 rounded-box">
      <li>
        <Link to="/identity/import-generate-keypair">
          Import / Generate Key
        </Link>
      </li>
      <li>
        <Link to="/identity/publish-key">Publish My Key</Link>
      </li>
      <li>
        <Link to="/identity/profile">Edit My Profile</Link>
      </li>
      <li>
        <Link to="/identity/backup-key">Backup Key</Link>
      </li>
      <li>
        <Link to="/identity/revoke-key">Revoke Key</Link>
      </li>
    </ul>
  );
}

export default IdentitySubNav;
