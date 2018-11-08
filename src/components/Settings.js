import React, { Component } from 'react';
import SettingsConfig from './SettingsConfig';
import PropTypes from 'prop-types';
import './Settings.css';
import { Header, List, Checkbox } from 'semantic-ui-react'

const checkboxItems = SettingsConfig.features;

const signInWidgetOption = {
  baseUrl: "http://localhost:8080",
  logo: '/logo.svg',
  features: {
    router: true,
  },
};

class Settings extends Component {

  static propTypes = {
    settingChangedFn: PropTypes.func,
  };

  constructor(opt) {
    super(opt);
  }

  componentDidMount() {
    this.props.settingChangedFn(signInWidgetOption);
  }

  toggleCheckbox = (event, checkboxItem) => {
    signInWidgetOption.features[checkboxItem.label] = checkboxItem.checked;
    this.props.settingChangedFn(signInWidgetOption);
  }

  render() {
    return (
      <div className="Settings">
        <Header as='h2'>Widget Settings</Header>

        <Header as='h3'>Features</Header>
        <List>
          {
            checkboxItems.map((label) => {
              return <List.Item key={label}>
                       <Checkbox label={label} onChange={this.toggleCheckbox} />
                     </List.Item>
            })
          }
        </List>
      </div>
    );
  }
}

export default Settings;
