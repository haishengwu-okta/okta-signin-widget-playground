const authResp = () => {
    const authState = '';
    const authType = '';
    const policy = {
        "allowRememberDevice": false,
        "rememberDeviceLifetimeInMinutes": 0,
        "rememberDeviceByDefault": false,
        "factorsPolicyInfo": {
            "opf1emz8qeuVPx5El1d8": {
                "autoPushEnabled": true
            }
        }
    };

    const stateToken = 'state-token-23';

    let authResp = {
        _links: {},
        _embedded: {},
    };

    if (authState === 'SUCCESS') {
        if (authType === 'step-up') {
            authResp._links.next = {
                href: '/login/step-up/redirect?' + stateToken,
                name: "original",
                hints: {
                    allow: ['GET']
                }
            }
        } else {
            authResp.sessionToken = 'session-token-abc';
        }
    }
    else if (['MFA_REQUIRED', 'MFA_CHALLENGE', 'UNAUTHENTICATED'].contain(authState)) {
        authResp._embedded.factors = [];
        authResp._embedded.policy = policy;
    }

    authResp = {
        stateToken: stateToken,
        expiresAt: 'some expiration date',
        status: authState,
        type: 'TODO: stateToken.type'
    }
}
