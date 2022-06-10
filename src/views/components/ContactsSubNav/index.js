import React from 'react';

function ContactsSubNav({ children, ...attributes }) {
    return (
        <ul className="menu bg-base-300 w-56 p-2 rounded-box">
            <li>
                <a href='/contacts'>List Contacts</a>
            </li>
            <li>
                <a href='/contacts/add'>Add Contacts</a>
            </li>
        </ul>
    );
}

export default ContactsSubNav;