import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div>
            <li>
                <Link to="/">Home</Link>
            </li>
        </div>
    );
}

export default Navigation;