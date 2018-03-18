import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Stores, Cuisines } from './ApiHandler';

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
              <button href="#" className="btn btn-primary" onClick={e => this.props.buy(1, item)}>Add to order</button>
            </div>
          </div>
        ) : 'Loading products...'}

      </div>
    )
  }

}
