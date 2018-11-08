import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';
import LoginSuccess from "./LoginSuccess";

class OktaSignInWidget extends Component {
  static propTypes = {
    signInWidgetOption: PropTypes.object
  };
  constructor (props) {
    super(props);
    this.state = {
      loginState: null
    }
  }

  componentDidMount() {
    this.renderWidget();
  }

  componentDidUpdate() {
    this.renderWidget();
  }

  loginSuccess = (res) => {
    this.setState({
      loginState: res.status
    });
  }

  loginError = (res) => {
    console.error('sign in widget login error', res);
  }

  renderWidget() {
    if (this.signIn) {
      this.signIn.remove();
    }
    this.signIn = new OktaSignIn(this.props.signInWidgetOption);
    this.signIn.renderEl(
      { el: '#sign-in-widget' },
      this.loginSuccess,
      this.loginError
    );
  }

  render() {
    let mainComponent;
    if (this.state.loginState === 'SUCCESS') {
      mainComponent = <LoginSuccess />;
    } else {
      mainComponent = <div id="sign-in-widget" />;
    }
    return (
      <div>
        {mainComponent}
      </div>
    );
  }
}

export default OktaSignInWidget;
