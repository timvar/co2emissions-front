import React from 'react';
import { Link } from 'react-router-dom';

/* Navbar links when user logged out */
const SignedOutLinks = () => {
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to='/signin'>Login</Link>
            </li>
        </ul>
    );
}

export default SignedOutLinks;