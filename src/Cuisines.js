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
      <div className="container">
        <h2>Cuisines</h2>
        <ul>
          {this.state.cuisines ? this.state.cuisines.map((item, i) =>
            <li key={i}><Link to={"/cuisine/"+item.id}>{item.name}</Link></li>
          ) : 'Loading...'}
        </ul>
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
        <h2>Choose a store:</h2>
        <ul>
          {this.state.cuisines ? this.state.cuisines.map((item, i) =>
            <li key={i}>
              <Link to={"/store/"+item.id}><strong>{item.name}</strong></Link>
              <p><small>{item.address}</small></p>
            </li>
          ) : 'Loading...'}
        </ul>
      </div>
    )
  }

}
