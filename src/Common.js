import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logo from './skip_logo_knockout.svg';

export class Header extends Component {

  render() {
    return (

      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <Link className="navbar-brand" to="/"><img src={Logo} alt="Skip the dishes" /></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/order">Your order ({ Object.keys(this.props.order).length })</Link>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0">
            {this.props.auth !==null ?
              <Link to="/" className="nav-link" onClick={this.props.onLogout}>Sign out</Link>
            :
              <Link className="nav-link" to="/auth">Sign in</Link>
            }
          </form>
        </div>
      </nav>
    )
  }

}
