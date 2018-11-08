import React, { Component } from 'react';
import './App.css';
import OktaSignInWidget from './components/OktaSignInWidget';
import Settings from './components/Settings';
import APIConfig from "./components/APIConfig";
import { save as saveApiConfig } from './api/config';
import { Grid } from 'semantic-ui-react'

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
      <Grid>
        <Grid.Column floated='right' width={4}>
          <Settings settingChangedFn={this.saveSignInWidgetOptions} />
        </Grid.Column>
        <Grid.Column width={5} floated='left'>
          {
            this.state.signInWidgetOption &&
            <OktaSignInWidget signInWidgetOption={this.state.signInWidgetOption}
              apiMockChanged={this.state.apiMockChanged}
            />
          }
        </Grid.Column>
        <Grid.Column floated='left' width={5}>
          <APIConfig apiConfigFn={this.apiConfigFn} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
