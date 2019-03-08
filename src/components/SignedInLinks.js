import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/actions/authActions';

/* Navbar links when user logged in */
const SignedInLinks = (props) => {
    return (
        
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/show">Show</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/update">Update</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/" onClick={props.signOut}>Log Out</Link>
            </li>
        </ul>

    
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
