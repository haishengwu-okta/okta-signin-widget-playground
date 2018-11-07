import React, { Component } from 'react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

class OktaSignInWidget extends Component {
  constructor (props) {
    super(props);
    this.signIn = new OktaSignIn({
      baseUrl: "http://rain.okta1.com:1802/",
      logo: '/react.svg',
      features: this.getWidgetDefaultFeatures()
    });
  }

  getWidgetDefaultFeatures() {
    return {
        router: true,
        rememberMe: true,
        multiOptionalFactorEnroll: true
    };
  }

  componentDidMount() {
    this.signIn.renderEl(
      { el: '#sign-in-widget' },
      () => {
        //success
      },
      (err) => {
        throw err;
      },
    );
  }

  render() {
    return (
      <div>
        <div id="sign-in-widget" />
      </div>
    );
  }
}

export default OktaSignInWidget;
