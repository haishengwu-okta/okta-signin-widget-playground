
import React from 'react';
import './LoginSuccess.css';

function LoginSuccess (props) {
    return (
        <div className="login-success">
            <h2>Welcome to Okta!</h2>
            <button onClick={props.logoutFn}>Logout</button>
        </div>
    )
}

export default LoginSuccess;
