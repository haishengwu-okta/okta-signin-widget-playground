import _ from 'lodash';
import React, { Component } from 'react';
import SettingsConfig from './SettingsConfig';
import PropTypes from 'prop-types';
import './Settings.css';
import { Header, List, Checkbox, Popup, Divider, Form, Card } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const checkboxItems = SettingsConfig.features;

const signInWidgetOption = {
  baseUrl: "http://localhost:8080",
  logo: '/img/logo.svg',
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

  componentDidMount() {
    this.props.settingChangedFn(signInWidgetOption);
  }

  toggleCheckbox = (event, checkboxItem) => {
    signInWidgetOption.features[checkboxItem.label] = checkboxItem.checked;
    this.props.settingChangedFn(signInWidgetOption);
    this.notify("Widget Config Updated");
  }

  updateSignInWidget = _.throttle(() => {
    this.props.settingChangedFn(signInWidgetOption);
    this.notify("SignIn Widget option has been updated.");
  }, 5000);

  updateBaseUrl = (event) => {
    const inputValue = event.currentTarget.value;
    if (inputValue.indexOf('http') === 0) {
      signInWidgetOption.baseUrl = inputValue;
      this.updateSignInWidget();
    }
  }

  updateStateToken = (event) => {
    const inputValue = event.currentTarget.value;
    signInWidgetOption.stateToken = inputValue;
    this.updateSignInWidget();
  };

  render() {
    return (
      <Card className="settings">
        <Card.Content>
          <Header as='h2'>Widget Settings</Header>

          <Form size="small">

            <Header as='h3'>Features</Header>
            <Form.Field>
              <List>
                {
                  checkboxItems.map((label) => {
                    return <List.Item key={label}>
                      <Checkbox label={label} onChange={this.toggleCheckbox} />
                    </List.Item>
                  })
                }
              </List>
            </Form.Field>

            <Divider />

            <Form.Field>
              <Popup trigger={<Form.Input label="Base URL" onBlur={this.updateBaseUrl} placeholder="okta domain url" />}>
                Specify a base url to bootstrap the widget
            </Popup>
            </Form.Field>

            <Form.Field>
              <Form.Input label="State Token" placeholder="" onBlur={this.updateStateToken} />
            </Form.Field>

          </Form>

          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </Card.Content>
      </Card>
    );
  }
}

export default Settings;
