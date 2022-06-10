import React from 'react';

function IdentitySubNav({ children, ...attributes }) {
    return (
        <ul className="menu bg-base-300 w-56 p-2 rounded-box">
            <li>
                <a href='/identity/import-generate-keypair'>Import / Generate Key</a>
            </li>
            <li>
                <a href='/identity/publish-key'>Publish My Key</a>
            </li>
            <li>
                <a href='/identity/profile'>Edit My Profile</a>
            </li>
            <li>
                <a href='/identity/backup-key'>Backup Key</a>
            </li>
            <li>
                <a href='/identity/revoke-key'>Revoke Key</a>
            </li>
        </ul>
    );
}

export default IdentitySubNav;