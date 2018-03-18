import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Cuisines } from './ApiHandler';

export default class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cuisines: null
    }
  }

  componentWillMount() {
    Cuisines.get().then(response => {
      this.setState({cuisines: response})
    })
  }

  render() {
    return (
      <div className="container text-center">
        <h2 className="mb-3">Choose the type of food you like:</h2>
          {this.state.cuisines ? this.state.cuisines.map((item, i) =>
            <Link key={i} to={"/cuisine/"+item.id} className="btn btn-lg mr-2 mb-2 btn-outline-primary">{item.name}</Link>
          ) : 'Loading...'}
      </div>
    )
  }

}

export class Cuisine extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cuisines: null
    }
  }

  componentWillMount() {
    Cuisines.get(this.props.match.params.id).then(response => {
      this.setState({cuisines: response})
    })
  }

  render() {
    return (
      <div className="container">
        <h2 className="mb-3">Choose a restaurant:</h2>
        <ul>
          {this.state.cuisines ? this.state.cuisines.map((item, i) =>
            <li key={i}>
              <h3><Link to={"/store/"+item.id}>{item.name}</Link></h3>
              <p><small>{item.address}</small></p>
            </li>
          ) : 'Loading...'}
        </ul>
      </div>
    )
  }

}
