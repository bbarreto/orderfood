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

        <ul>
          {this.state.products ? this.state.products.map((item, i) =>
            <li key={i}><Link to={"/cuisine/"+item.id}>{item.name}</Link></li>
          ) : 'Loading products...'}
        </ul>

      </div>
    )
  }

}
