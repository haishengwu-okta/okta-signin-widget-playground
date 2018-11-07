import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

class OktaSignInWidget extends Component {
  static propTypes = {
    successFn: PropTypes.func,
  };
  constructor (props) {
    super(props);
    this.signIn = new OktaSignIn({
      baseUrl: "http://localhost:8080/",
      logo: '/react.svg',
      features: {
        router: true,
        rememberMe: true,
        multiOptionalFactorEnroll: true
      }
    });
  }

  componentDidMount() {
    this.signIn.renderEl(
      { el: '#sign-in-widget' },
      this.props.successFn,
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
