import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Stores } from './ApiHandler';

export class Store extends Component {

  constructor(props) {
    super(props);

    this.state = {
      store: null,
      products: [ ]
    }
  }

  componentWillMount() {
    Stores.getById(this.props.match.params.id).then(response => {
      this.setState({store: response})
    })

    Stores.getProducts(this.props.match.params.id).then(response => {
      this.setState({products: response})
    })
  }

  render() {
    if (!this.state.store) {
      return (
          <div className="container">
            <p>Loading...</p>
          </div>
      )
    }

    return (
      <div className="container">
        <h2>{this.state.store.name}</h2>
        <p>{this.state.store.address}</p>

        {this.state.products ? this.state.products.map((item, i) =>
          <div key={i} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title"><Link to={"/store/"+this.state.store.id+"/product/"+item.id}>{item.name}</Link></h5>
              <h6 className="card-subtitle mb-2 text-muted">$ {item.price}</h6>
              <p className="card-text">{item.description}</p>
              <button href="#" className="btn btn-primary" onClick={e => this.props.buy(1, item, this.state.store)}>Add to order</button>
            </div>
          </div>
        ) : 'Loading products...'}

      </div>
    )
  }

}

export class Product extends Component {

  constructor(props) {
    super(props);

    this.state = {
      store: null,
      product: null
    }
  }

  componentWillMount() {
    Stores.getById(this.props.match.params.id).then(response => {
      this.setState({store: response})
    })

    Stores.getProductById(this.props.match.params.productId).then(response => {
      this.setState({product: response})
    })
  }

  render() {
    if (!this.state.store) {
      return (
          <div className="container">
            <p>Loading...</p>
          </div>
      )
    }

    return (
      <div className="container">
        {this.state.product ? (
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8">
                <h2>{this.state.product.name}</h2>
                <p>{this.state.product.description}</p>
              </div>
              <div className="col-12 mb-5 col-md-4">
                <h2 className="text-center"><strong>$ {this.state.product.price.toFixed(2)}</strong></h2>
                <button href="#" className="btn btn-block btn-primary" onClick={e => this.props.buy(1, this.state.product, this.state.store )}>Add to order</button>
                <Link className="btn btn-sm btn-block btn-outline-primary" to={"/store/"+this.state.store.id}>See all products from {this.state.store.name}</Link>
              </div>
            </div>
          </div>
        ) : 'Loading products...'}

      </div>
    )
  }

}
