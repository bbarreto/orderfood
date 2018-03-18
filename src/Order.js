import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Stores, Cuisines } from './ApiHandler';

export class Order extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (Object.keys(this.props.order).length === 0) {
      return (
          <div className="container">
            <p className="text-center py-5">Your order is empty :(</p>
            <p className="text-center">
              <Link to="/" class="btn btn-primary">Find some delicious food</Link>
            </p>
          </div>
      )
    }

    return (
      <div className="container">
        <h2>Order</h2>
        <p>:)</p>

      </div>
    )
  }

}
