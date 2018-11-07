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

  apiConfigSuccessFn = (res) => {
    this.setState({
      loginState: null
    })
  }
  loginSuccessFn = (res) => {
    this.setState({
      loginState: 'SUCCESS'
    })
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <APIConfig successFn={this.apiConfigSuccessFn}/>
        { this.state.loginState ?
          <LoginSuccess /> :
          <OktaSignInWidget successFn={this.loginSuccessFn} />
        }
      </div>
    );
  }
}

export default App;
