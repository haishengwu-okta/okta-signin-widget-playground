import React, { Component } from 'react';
import './App.css';
import OktaSignInWidget from './components/OktaSignInWidget';
import APIConfig from "./components/APIConfig";
import LoginSuccess from './components/LoginSuccess';

class App extends Component {

  constructor(options) {
    super(options);
    this.state = {
      loginState: null
    }
  }
  loginSuccessFn = (res) => {
    this.setState({
      loginState: 'SUCCESS'
    })
  };

  render() {
    return (
      <div className="App">
        <APIConfig />
        { this.state.loginState ?
          <LoginSuccess /> :
          <OktaSignInWidget successFn={this.loginSuccessFn} />
        }
      </div>
    );
  }
}

export default App;
