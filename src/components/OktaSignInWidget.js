import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

class OktaSignInWidget extends Component {
  static propTypes = {
    successFn: PropTypes.func,
    featureOptions: PropTypes.object
  };
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    this.renderWidget();
  }

  componentDidUpdate() {
    console.log('component updated');
    this.signIn.remove();
    this.widgetEl.innerHTML = '';
    this.renderWidget();
  }

  renderWidget() {
    this.signIn = new OktaSignIn({
      baseUrl: "http://localhost:8080/",
      logo: '/react.svg',
      features: this.props.featureOptions
    });
    this.signIn.renderEl(
      { el: '#sign-in-widget' },
      this.props.successFn,
      (err) => {
        throw err;
      },
    );
  }

  render() {
    this.renderWidget();
    return (
      <div>
        <div id="sign-in-widget" ref={el => this.widgetEl = el} />
      </div>
    );
  }
}

export default OktaSignInWidget;
