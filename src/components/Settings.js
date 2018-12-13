import _ from 'lodash';
import React, { Component } from 'react';
import SettingsConfig from './SettingsConfig';
import PropTypes from 'prop-types';
import './Settings.css';
import { Header, List, Checkbox, Popup, Divider, Form, Card } from 'semantic-ui-react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Constants from '../util/Constants';

const checkboxItems = SettingsConfig.features;
const languageOptions = [
  { key: 'en', value: 'en', flag: 'us', text: 'English' },
  { key: 'fr', value: 'fr', flag: 'fr', text: 'France' },
  { key: 'zh-CN', value: 'zh-CN', flag: 'cn', text: 'zh-CN' },
]
const signInWidgetOption = {
  baseUrl: Constants.MOCK_SERVER,
  logo: '/img/logo.svg',
  features: {
    // router: true,
    // rememberMe: false,
  },
};
// TODO:
// 1. save to local storage
// 2. add reset button

class Settings extends Component {

  static propTypes = {
    settingChangedFn: PropTypes.func,
  };

  notify = (message) => {
    // toast.info(message);
  }

  componentDidMount() {
    this.props.settingChangedFn(signInWidgetOption);
  }

  toggleCheckbox = (event, checkboxItem) => {
    signInWidgetOption.features[checkboxItem.label] = checkboxItem.checked;
    this.props.settingChangedFn(signInWidgetOption);
    // this.notify("Widget Config Updated");
  }

  updateSignInWidget = _.throttle(() => {
    this.props.settingChangedFn(signInWidgetOption);
    // this.notify("SignIn Widget option has been updated.");
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

  updateLanguage = (event, { value }) => {
    signInWidgetOption.language = value;
    this.updateSignInWidget();
  }

  render() {
    return (
      <Card className="settings">
        <Card.Content>
          <Header as='h2'>Widget Settings</Header>

            <Header as='h3'>Features</Header>
          <Form size="small">

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

            <Form.Field>
              <Form.Select label='Select your language' options={languageOptions} onChange={this.updateLanguage} />
            </Form.Field>

          </Form>

          {/* <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          /> */}
        </Card.Content>
      </Card>
    );
  }
}

export default Settings;
