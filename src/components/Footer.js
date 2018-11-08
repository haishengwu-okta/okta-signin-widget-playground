import React from 'react';
import { Card } from 'semantic-ui-react';
import './Footer.css';

class Footer extends React.Component {
  render() {
  return (
    <Card className="footer">
      <a href="http://www.okta.com">Powered by Okta @ 2018</a>
    </Card>
    )
  }
}

export default Footer;
