import React from 'react';
import { Label, } from 'semantic-ui-react';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <Label className="footer">
        <a href="http://www.okta.com">Powered by Okta @ 2018</a>
      </Label>
    );
  }
}

export default Footer;
