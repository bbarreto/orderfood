import React, { Component } from 'react';
import './App.css';

import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

import Auth from './Auth';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Auth />
      </div>
    );
  }
}

export default App;
