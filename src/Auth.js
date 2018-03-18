import React, { Component } from 'react';

import {User} from './ApiHandler';

class Auth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleAuth(e) {
    e.preventDefault();
    User.auth(this.state.email, this.state.password);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h2>Sign In</h2>
        <form onSubmit={e => this.handleAuth(e)}>
          <div className="form-group">
            <label htmlFor="txtEmail">E-mail</label>
            <input type="email" required id="txtEmail" name="email" className="form-control" autoFocus value={this.state.email} onChange={e => this.handleInputChange(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="txtPassword">Password</label>
            <input type="password" required id="txtPassword" name="password" className="form-control" value={this.state.password} onChange={e => this.handleInputChange(e)} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Sign in</button>
            <button type="button" className="btn btn-link">Create new account</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
