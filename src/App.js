import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Auth, {Signup} from './Auth';
import Cuisines, { Cuisine } from './Cuisines';
import { Store, Product } from './Stores';
import { Order } from './Order';
import { Header } from './Common';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      auth: localStorage.token?localStorage.token:null,
      order: localStorage.order?JSON.parse(localStorage.order):{}
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
  }

  login(token) {
    this.setState({auth: token});
    localStorage.setItem("token", token);
  }

  logout() {
    this.setState({auth: null, order: {}});
    localStorage.removeItem('token');
    localStorage.removeItem('order');
  }

  addToOrder(qty, item, store) {
    var order = this.state.order;

    if (order.hasOwnProperty(item.id)) {
      order[item.id].qty += qty;
    } else {
      order[item.id] = {
        qty: qty,
        item: item,
        store: store
      }
    }

    this.setState({order: order})
    localStorage.setItem("order", JSON.stringify(order));
  }

  removeFromOrder(id) {
    var order = this.state.order;

    if (order.hasOwnProperty(id)) {
      delete order[id]
    }

    this.setState({order: order})
    localStorage.setItem("order", JSON.stringify(order));
  }

  withProps(Component, props) {
    return function(matchProps) {
      return <Component {...props} {...matchProps} />
    }
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Header auth={this.state.auth} onLogout={this.logout} order={this.state.order} />
          <Switch>
            <Route exact path="/auth" component={this.withProps(Auth, { ...this.state, onAuth: token => this.login(token) })} />
            <Route exact path="/signup" component={this.withProps(Signup, { ...this.state, onAuth: token => this.login(token) })} />
            <Route exact path="/cuisine/:id" component={this.withProps(Cuisine, this.state)} />
            <Route exact path="/store/:id" component={this.withProps(Store, { ...this.state, buy: (qty, item, store) => this.addToOrder(qty, item, store) } )} />
            <Route exact path="/store/:id/product/:productId" component={this.withProps(Product, { ...this.state, buy: (qty, item, store) => this.addToOrder(qty, item, store) } )} />
            <Route exact path="/order" component={this.withProps(Order, { ...this.state, removeItem: (id) => this.removeFromOrder(id) } )} />
            <Route exact path="/" component={this.withProps(Cuisines, this.state)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
