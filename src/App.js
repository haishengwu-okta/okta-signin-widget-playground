import React, { Component } from 'react';
import './App.css';
import OktaSignInWidget from './components/OktaSignInWidget';
import Settings from './components/Settings';
import APIConfig from "./components/APIConfig";
import LoginSuccess from './components/LoginSuccess';

class App extends Component {

  constructor(options) {
    super(options);
    this.state = {
      loginState: null,
      features: {
        router: true,
        rememberMe: true,
        multiOptionalFactorEnroll: true,
    	}
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

  settingsSuccessFn = (res) => {
  	console.log('features refreshed');
  	console.log(res);
    this.setState({
      features: res
    })
  };

  render() {
    return (
      <div className="App">
        <Settings successFn={this.settingsSuccessFn}/>
        <APIConfig successFn={this.apiConfigSuccessFn}/>
        { this.state.loginState ?
          <LoginSuccess /> :
          <OktaSignInWidget successFn={this.loginSuccessFn} featureOptions={this.state.features} />
        }
      </div>
    );
  }
}

export default App;
