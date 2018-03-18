import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Auth, {Signup} from './Auth';

class App extends Component {
  withProps(Component, props) {
    return function(matchProps) {
      return <Component {...props} {...matchProps} />
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/auth" component={this.withProps(Auth, this.state)} />
          <Route path="/signup" component={this.withProps(Signup, this.state)} />
        </Switch>
      </Router>


    );
  }
}

export default App;
