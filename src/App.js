import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OktaSignInWidget from './components/OktaSignInWidget';

class App extends Component {
  render() {
    return (
      <div className="App">
        <OktaSignInWidget />
      </div>
    );
  }
}

export default App;
