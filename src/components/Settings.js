import React, { Component } from 'react';
import widgetConfig from '../config/widgetConfig';
import Checkbox from './Checkbox';
import OktaSignInWidget from './OktaSignInWidget';

const checkboxItems = widgetConfig.features;

class Settings extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Map();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.set(label, true);
    }
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
