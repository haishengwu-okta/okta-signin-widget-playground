import React, { Component } from 'react';
import SettingsConfig from './SettingsConfig';
import Checkbox from './forms/Checkbox';
import PropTypes from 'prop-types';
import './Settings.css';

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
    this.selectedCheckboxes = new Map();
  }

  componentDidMount() {
    this.props.settingChangedFn(signInWidgetOption);
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
      signInWidgetOption.features[label] = false;
    } else {
      this.selectedCheckboxes.set(label);
      signInWidgetOption.features[label] = true;
    }
    this.props.settingChangedFn(signInWidgetOption);
  }

  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  )

  createCheckboxes = () => (
    checkboxItems.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="Settings">
        <h2>Widget Settings</h2>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
                {this.createCheckboxes()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
