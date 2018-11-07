import React, { Component } from 'react';
import './App.css';
import OktaSignInWidget from './components/OktaSignInWidget';
import APIConfig from "./components/APIConfig";

class App extends Component {
  render() {
    return (
      <div className="App">
        <APIConfig />
        <OktaSignInWidget />
      </div>
    );
  }
}

export default App;
