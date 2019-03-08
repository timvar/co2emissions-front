import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn} from '../store/actions/authActions';
import { Redirect } from 'react-router-dom';

/* User login page */
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    inputChanged = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
        this.setState({
            email: '',
            password: ''
        })
    }
    
    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' />
        const { email, password } = this.state;
        return (
            <div className="container">
                <h2>Sign In</h2>  
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="lastname" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input 
                            type="text"
                            onChange={this.inputChanged}
                            className="form-control" 
                            id="email"
                            name="email"
                            value={email}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastname" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input 
                            type="text"
                            onChange={this.inputChanged}
                            className="form-control" 
                            id="password"
                            name="password"
                            value={password}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="container">
                    { authError ? <h4>{authError}</h4> : null }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
