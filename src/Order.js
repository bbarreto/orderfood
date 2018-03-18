import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Orders } from './ApiHandler';

export class Order extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stores: {},
      total: 0
    }

    if (Object.keys(this.props.order).length > 0) {
      Object.keys(this.props.order).map(item => {
        this.state.stores[this.props.order[item].store.id] = true;
        this.state.total += this.props.order[item].item.price * this.props.order[item].qty
      });
    }

    this.placeOrder = this.placeOrder.bind(this);

  }

  placeOrder() {
    var order = this.props.order;
    var stores = this.state.stores;
    var orderPromises = [];

    Object.keys(stores).map(storeId => {
      var orderItems = [];
      Object.keys(order).map(productId => {
        if (order[productId].store.id == storeId) {
          orderItems.push({
            productId: parseInt(productId),
            quantity: order[productId].qty
          });
        }
      });

      orderPromises.push(Orders.create({
        contact: 'Contact name',
        deliveryAddress: 'delivery address',
        storeId: parseInt(storeId),
        orderItems: orderItems,
        status: 'waiting'
      }))
    });

    Promise.all(orderPromises).then(() => {
      window.alert('Order sent! Thank you')
    }).catch((err) => {
      window.alert('Error while sending orders')
      console.log('nem tudo ok', err)
    })

  }

  render() {
    if (Object.keys(this.props.order).length === 0) {
      return (
          <div className="container">
            <p className="text-center py-5">Your order is empty :(</p>
            <p className="text-center">
              <Link to="/" className="btn btn-primary">Find some delicious food</Link>
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
              <td>
                <Link to={"/store/"+this.props.order[id].item.storeId+"/product/"+this.props.order[id].item.id}>{this.props.order[id].item.name}</Link>
                <p><small className="text-muted">{this.props.order[id].store.name}</small></p>
              </td>
              <td>{this.props.order[id].item.price.toFixed(2)}</td>
              <td><input readOnly type="text" className="form-control" style={{width:'4rem'}} value={this.props.order[id].qty} /></td>
              <td>{ (this.props.order[id].item.price*this.props.order[id].qty).toFixed(2) }</td>
              <td>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={e => this.props.removeItem(id)}>Remove</button>
              </td>
            </tr>
          ) : <tr><td colSpan="5">Loading products...</td></tr>}
            <tr>
              <td colSpan="3" className="text-right">
                <strong>Total:</strong>
              </td>
              <td> {this.state.total.toFixed(2)} </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        {this.props.auth && Object.keys(this.state.stores).length > 1 ? (
          <div className="alert alert-warning" role="alert">
            <p>
            <strong>BE CAREFUL!</strong> Your order has items from more than one restaurant.
            When you click "Place order", it will be placed {Object.keys(this.state.stores).length} different orders.
            These orders may have different delivery times.
            </p>
            <p className="text-center">
              <button type="button" className="btn btn-lg btn-primary" onClick={e=>this.placeOrder()}>Place {Object.keys(this.state.stores).length} orders</button>
            </p>
          </div>
        ) : this.props.auth ? (
          <p className="text-center">
            <button type="button" className="btn btn-lg btn-primary" onClick={e=>this.placeOrder()}>Place order</button>
          </p>
        ) : (
          <p className="text-center">
            <Link to="/auth" className="btn btn-lg btn-primary">Log In to place order</Link>
          </p>
        ) }



      </div>
    )
  }

}
