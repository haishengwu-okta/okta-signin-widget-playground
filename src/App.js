import React, { Component } from 'react';
import './App.css';
import OktaSignInWidget from './components/OktaSignInWidget';
import Settings from './components/Settings';
import APIConfig from "./components/APIConfig";
import axios from 'axios';

const MOCK_API_SERVER = 'http://localhost:8080';

const saveApiConfig = (postDataKeys) => {
  axios.post(`${MOCK_API_SERVER}/config`, {
    config: postDataKeys,
  })
    .then((response) => {
      console.log('saved API config', response);
    })
    .catch((error) => {
      console.log('API config error', error);
    });
}

class App extends Component {

  constructor(options) {
    super(options);
    this.state = {
      apiConfig: null,
      signInWidgetOption: null,
    }
  }

  apiConfigFn = (res) => {
    saveApiConfig(res);
  }

  saveSignInWidgetOptions = (res) => {
    this.setState({
      signInWidgetOption: res
    });
  };

  render() {
    return (
      <div className="App">
        <Settings settingChangedFn={this.saveSignInWidgetOptions} />
        <APIConfig apiConfigFn={this.apiConfigFn} />
        {this.state.signInWidgetOption && <OktaSignInWidget signInWidgetOption={this.state.signInWidgetOption} />}
      </div>
    );
  }
}

export default App;
