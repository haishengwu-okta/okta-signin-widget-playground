import React, { Component } from 'react';
import SettingsConfig from './SettingsConfig';
import PropTypes from 'prop-types';
import './Settings.css';
import { Header, List, Checkbox } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  notify = (message) => {
   toast.info(message);
  }

  constructor(opt) {
    super(opt);
    this.selectedCheckboxes = new Map();
  }

  componentDidMount() {
    this.props.settingChangedFn(signInWidgetOption);
  }

  toggleCheckbox = (event, checkboxItem) => {
    signInWidgetOption.features[checkboxItem.label] = checkboxItem.checked;
    this.props.settingChangedFn(signInWidgetOption);
    this.notify("Widget Config Updated");
  }

  updateBaseUrl = (event) => {
    const inputValue = event.currentTarget.value;
    if (inputValue) {
      const self = this;
      // fake debounce
      setTimeout(function() {
        signInWidgetOption.baseUrl = inputValue;
        self.props.settingChangedFn(signInWidgetOption);
        self.notify("Base URL updated");
      }, 4000);

    }
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
        <div className='ui divider' />
        <p>Specify a base url to bootstrap the widget</p>
        <div className='ui labeled input'>
          <div className='ui label label'> </div>
          <input type="text" onChange={this.updateBaseUrl} placeholder="oktadomain url"/>
          <ToastContainer 
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </div>
      </div>
    );
  }
}

export default Settings;
