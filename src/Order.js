import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Stores, Cuisines } from './ApiHandler';

export class Order extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.order);
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
        <table className="table table-hover mb-5">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        {this.props.order ? Object.keys(this.props.order).map((id) =>
          <tr key={id}>
            <td><Link to={"/store/"+this.props.order[id].item.storeId+"/product/"+this.props.order[id].item.id}>{this.props.order[id].item.name}</Link></td>
            <td>{this.props.order[id].item.price}</td>
            <td><input type="text" className="form-control" style={{width:'4rem'}} value={this.props.order[id].qty} /></td>
            <td>{this.props.order[id].item.price*this.props.order[id].qty}</td>
            <td><button type="button" className="btn btn-link">Remove item</button></td>
          </tr>
        ) : 'Loading products...'}
          </tbody>
        </table>

        <p class="text-center">
          <button type="button" className="btn btn-lg btn-primary">Place order</button>
        </p>

      </div>
    )
  }

}
