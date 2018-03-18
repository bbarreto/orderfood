import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Auth, {Signup} from './Auth';
import Cuisines, { Cuisine } from './Cuisines';
import { Store } from './Stores';
import { Order } from './Order';
import { Header } from './Common';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      auth: null,
      order: { }
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(token) {
    this.setState({auth: token});
  }

  logout() {
    this.setState({auth: null, order: {}});
  }

  addToOrder(id, qty) {
    var order = this.state.order;
    order.push({
      id: id,
      qty: qty
    })
    this.setState({order: order})
  }

  withProps(Component, props) {
    return function(matchProps) {
      return <Component {...props} {...matchProps} />
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Header auth={this.state.auth} onLogout={this.logout} order={this.state.order} />
          <Switch>
            <Route exact path="/auth" component={this.withProps(Auth, { ...this.state, onAuth: token => this.login(token) })} />
            <Route exact path="/signup" component={this.withProps(Signup, { ...this.state, onAuth: token => this.login(token) })} />
            <Route exact path="/cuisine/:id" component={this.withProps(Cuisine, this.state)} />
            <Route exact path="/store/:id" component={this.withProps(Store, this.state)} />
            <Route exact path="/order" component={this.withProps(Order, this.state)} />
            <Route exact path="/" component={this.withProps(Cuisines, this.state)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
