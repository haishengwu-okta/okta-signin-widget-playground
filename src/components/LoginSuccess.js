
import React from 'react';
import { Button } from 'semantic-ui-react';
import './LoginSuccess.css';

function LoginSuccess (props) {
    return (
        <div className="login-success">
            <h2 style={{color: 'white'}}>Welcome to Okta!</h2>
            <Button onClick={props.logoutFn}>Logout</Button>
        </div>
    );
}

export default LoginSuccess;
