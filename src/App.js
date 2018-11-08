import React, { Component } from 'react';
import './App.css';
import OktaSignInWidget from './components/OktaSignInWidget';
import Settings from './components/Settings';
import APIConfig from "./components/APIConfig";
import {save as saveApiConfig } from './api/config';


class App extends Component {

  constructor(options) {
    super(options);
    this.state = {
      apiConfig: null,
      signInWidgetOption: null,
    }
  }

  apiConfigFn = async (res) => {
    await saveApiConfig(res);
    this.setState({
      apiMockChanged: true
    })
  }

  saveSignInWidgetOptions = (signInWidgetOption) => {
    this.setState({
      signInWidgetOption
    });
  };

  render() {
    return (
      <div className="App">
        <Settings settingChangedFn={this.saveSignInWidgetOptions} />
        <APIConfig apiConfigFn={this.apiConfigFn} />
        {
          this.state.signInWidgetOption &&
            <OktaSignInWidget signInWidgetOption={this.state.signInWidgetOption}
                              apiMockChanged={this.state.apiMockChanged}
            />
          }
      </div>
    );
  }
}

export default App;
