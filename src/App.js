import React, { Component, } from 'react';
import './App.css';
import OktaSignInWidget from './components/OktaSignInWidget';
import Settings from './components/Settings';
import APIConfig from './components/APIConfig';
import Footer from './components/Footer';
import { save as saveApiConfig, } from './api/config';
// import { Grid } from 'semantic-ui-react'

class App extends Component {

  constructor(options) {
    super(options);
    this.state = {
      apiConfig: null,
      signInWidgetOption: null,
    };
  }

  apiConfigFn = async (res, refreshUI = true) => {
    await saveApiConfig(res);
    if (refreshUI) {
      this.setState({
        apiMockChanged: true,
      });
    }
  }

  saveSignInWidgetOptions = (signInWidgetOption) => {
    this.setState({
      signInWidgetOption,
    });
  };

  helloApp() {
    console.log('hello app');
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '5em',
      }}>
        <Settings settingChangedFn={this.saveSignInWidgetOptions} />
        {
          this.state.signInWidgetOption &&
            <OktaSignInWidget signInWidgetOption={this.state.signInWidgetOption}
              apiMockChanged={this.state.apiMockChanged}
            />
        }
        <APIConfig apiConfigFn={this.apiConfigFn} />
        <Footer />
      </div>

    );
  }
}

export default App;
