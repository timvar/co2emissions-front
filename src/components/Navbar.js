import React from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {
  const { auth, profile } = props;

  /* Show different set of links in Navbar depending on if user logged in or out */
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">CO2 Emissions</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          {links}
        </div>
      </nav>
    </div>
  )
}

/* User login status in Redux store */
const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
    }
}
export default connect(mapStateToProps)(Navbar);
