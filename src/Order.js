import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Orders } from './ApiHandler';

export class Order extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stores: {},
      total: 0,
      contactName: '',
      deliveryAddress: ''
    }

    if (Object.keys(this.props.order).length > 0) {
      Object.keys(this.props.order).map(item => {
        this.state.stores[this.props.order[item].store.id] = true
        this.state.total += this.props.order[item].item.price * this.props.order[item].qty
      });
    }

    this.placeOrder = this.placeOrder.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      error: null,
      [e.target.name]: e.target.value
    });
  }

  placeOrder(e) {
    e.preventDefault();
    var order = this.props.order;
    var stores = this.state.stores;
    var orderPromises = [];

    Object.keys(stores).map(storeId => {
      var orderItems = [];
      Object.keys(order).map(productId => {
        if (order[productId].store.id === storeId) {
          orderItems.push({
            productId: parseInt(productId, 10),
            quantity: order[productId].qty
          });
        }
      });

      orderPromises.push(Orders.create({
        contact: this.state.contactName,
        deliveryAddress: this.state.deliveryAddress,
        storeId: parseInt(storeId, 10),
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

        <form className="form my-3" onSubmit={e=>this.placeOrder(e)}>
        { this.props.auth ? (
          <div>
            <h3 className="mb-3">Delivery data:</h3>
            <div className="form-group mb-2 mr-2">
              <label htmlFor="contactName" className="mr-2">Contact name:</label>
              <input onChange={e => this.handleInputChange(e)} type="text" className="form-control" id="contactName" name="contactName" value={this.state.contactName} required />
            </div>
            <div className="form-group mb-2 mr-2">
              <label htmlFor="deliveryAddress" className="mr-2">Delivery Address:</label>
              <input onChange={e => this.handleInputChange(e)} type="text" className="form-control" id="deliveryAddress" name="deliveryAddress" value={this.state.deliveryAddress} required />
            </div>
          </div>
        ) : ''}

        {this.props.auth && Object.keys(this.state.stores).length > 1 ? (
          <div className="alert alert-warning" role="alert">
            <p>
            <strong>BE CAREFUL!</strong> Your order has items from more than one restaurant.
            When you click "Place order", it will be placed {Object.keys(this.state.stores).length} different orders.
            These orders may have different delivery times.
            </p>
            <p className="text-center">
              <button type="submit" className="btn btn-lg btn-primary">Place {Object.keys(this.state.stores).length} orders</button>
            </p>
          </div>
        ) : this.props.auth ? (
          <p className="text-center">
            <button type="submit" className="btn btn-lg btn-primary">Place order</button>
          </p>
        ) : (
          <p className="text-center">
            <Link to="/auth" className="btn btn-lg btn-primary">Log In to place order</Link>
          </p>
        ) }
        </form>
      </div>
    )
  }

}
