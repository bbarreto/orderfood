import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {User} from './ApiHandler';

export default class Auth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleAuth(e) {
    e.preventDefault();
    User.auth(this.state.email, this.state.password)
      .then(response => {
        window.alert('Logado!');
      })
      .catch(err => {
        this.setState({error: err.error});
      });
  }

  handleInputChange(e) {
    this.setState({
      error: null,
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="mb-3">Sign In</h2>
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
            <Link to="/signup" className="btn btn-link">Create new account</Link>
          </div>
        </form>
        {this.state.error?
        <div className="alert alert-danger" role="alert">
          {this.state.error}
        </div>
        :''}
      </div>
    );
  }
}

export class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'test',
      address: 'test',
      email: 'test@example.com',
      password: '123456',
      error: null
    };

    this.handleSignup = this.handleSignup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSignup(e) {
    e.preventDefault();
    User.signup({
      name: this.state.name,
      address: this.state.address,
      email: this.state.email,
      password: this.state.password,
    })
      .then(response => {
        console.log('success', response)
        window.alert('Welcome!');
      })
      .catch(err => {
        console.log('fail', err);
        this.setState({error: err.error});
      });
  }

  handleInputChange(e) {
    this.setState({
      error: null,
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="mb-3">Create new account</h2>
        <form onSubmit={e => this.handleSignup(e)}>
          <div className="form-group">
            <label htmlFor="txtName">Name</label>
            <input type="name" required id="txtName" name="name" className="form-control" autoFocus value={this.state.name} onChange={e => this.handleInputChange(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="txtAddress">Address</label>
            <input type="name" required id="txtAddress" name="address" className="form-control" autoFocus value={this.state.address} onChange={e => this.handleInputChange(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="txtEmail">E-mail</label>
            <input type="email" required id="txtEmail" name="email" className="form-control" autoFocus value={this.state.email} onChange={e => this.handleInputChange(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="txtPassword">Password</label>
            <input type="password" required id="txtPassword" name="password" className="form-control" value={this.state.password} onChange={e => this.handleInputChange(e)} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Create account</button>
            <Link to="/" className="btn btn-link">Cancel</Link>
          </div>
        </form>
        {this.state.error?
        <div className="alert alert-danger" role="alert">
          {this.state.error}
        </div>
        :''}
      </div>
    );
  }

}
