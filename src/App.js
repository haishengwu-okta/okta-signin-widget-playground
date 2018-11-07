import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OktaSignInWidget from './components/OktaSignInWidget';
import Settings from './components/Settings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Settings />
        <OktaSignInWidget />

      </div>
    );
  }
}

export default App;
