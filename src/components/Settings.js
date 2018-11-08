import React, { Component } from 'react';
import widgetConfig from '../config/widgetConfig';
import Checkbox from './Checkbox';
import OktaSignInWidget from './OktaSignInWidget';
import PropTypes from 'prop-types';

const checkboxItems = widgetConfig.features;
const defaultFeatures = {
    router: true,
    rememberMe: true,
    multiOptionalFactorEnroll: true
};

class Settings extends Component {
  static propTypes = {
    successFn: PropTypes.func,
  };

  constructor (props) {
    super(props);
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Map();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
      defaultFeatures[label] = false;
    } else {
      this.selectedCheckboxes.set(label);
      defaultFeatures[label] = true;
    }
    this.props.successFn(defaultFeatures);
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
