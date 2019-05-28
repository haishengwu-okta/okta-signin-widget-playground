const { enrolledFactors, availableFactors, } = require('./factors');

const cancelLink = {
  'cancel': {
    'href': 'http://localhost:9191/api/v1/authn/cancel',
    'hints': {
      'allow': [ 'POST', ],
    },
  },
};

const user = {
  'id': '00uqbxPh7V77mxdho0g3',
  'passwordChanged': '2018-10-09T22:20:02.000Z',
  'profile': {
    'login': 'inca@clouditude.net',
    'firstName': 'Inca-Louise',
    'lastName': 'O\'Rain Dum',
    'locale': 'en',
    'timeZone': 'America/Los_Angeles',
  },
};
const stateToken = 'state-token-23';

const authResp = () => {
  const authState = '';
  const authType = '';

  let authResp = {
    _links: {},
    _embedded: {},
  };

  if (authState === 'SUCCESS') {
    if (authType === 'step-up') {
      authResp._links.next = {
        href: '/login/step-up/redirect?' + stateToken,
        name: 'original',
        hints: {
          allow: ['GET',],
        },
      };
    } else {
      authResp.sessionToken = 'session-token-abc';
    }
  }
  else if (['MFA_REQUIRED', 'MFA_CHALLENGE', 'UNAUTHENTICATED',].contain(authState)) {
    authResp._embedded.factors = enrolledFactors;
    authResp._embedded.policy = {
      'allowRememberDevice': false,
      'rememberDeviceLifetimeInMinutes': 0,
      'rememberDeviceByDefault': false,
      'factorsPolicyInfo': {
        'id-111-okta-push': {
          'autoPushEnabled': true,
        },
      },
    };
    Object.assign(authResp._links, cancelLink);
  }
  else if (['MFA_ENROLL',].contain(authState)) {
    authResp._embedded.factors = availableFactors;
    Object.assign(authResp._links, cancelLink);
  }
  else if (['PASSWORD_EXPIRED', 'PASSWORD_WARN',].contain(authState)) {
    let next = {
      'name': 'changePassword',
      'href': 'http://localhost:9191/api/v1/authn/credentials/change_password',
      'hints': {
        'allow': [
          'POST',
        ],
      },
    };
    let skip = {};

    const passwordManagedByOkta = true;
    if (!passwordManagedByOkta) {
      if (authState === 'PASSWORD_WARN') {
        next = {
          'name': 'changePassword',
          'href': 'http://external.foo.com/change-password',
          'hints': {
            'allow': [
              'GET',
            ],
          },
        };
        skip = {
          'name': 'skip',
          'href': 'http://localhost:9191/api/v1/authn/skip',
          'hints': {
            'allow': [
              'POST',
            ],
          },
        };
      }
      if (authState === 'PASSWORD_EXPIRED') {
        next = {
          'name': 'changePassword',
          'href': 'http://external.foo.com/change-password',
          'hints': {
            'allow': [
              'GET',
            ],
          },
        };
        //   next = {
        //     'name': 'changePassword',
        //     'href': 'http://external.foo.com/password-expired',
        //     'hints': {
        //       'allow': [
        //         'GET',
        //       ],
        //     },
        //   };
      }
    }
    const policy = {
      'complexity': {
        'minLength': 8,
        'minLowerCase': 1,
        'minUpperCase': 1,
        'minNumber': 1,
        'minSymbol': 0,
        'excludeUsername': true,
      },
    };
    if (authState === 'PASSWORD_EXPIRED') {
      policy.age = {
        'minAgeMinutes': 0,
        'historyCount': 0,
      };
    }
    if (authState === 'PASSWORD_WARN') {
      policy.expiration = {
        'passwordExpireDays': 4,
      };
    }

    authResp.expiresAt = '2015-07-08T16:43:47.608Z';
    Object.assign(authResp._links, next, skip, cancelLink);
    authResp._embedded.policy = policy;
    authResp._embedded.user = user;
  }
  else if (['LOCKED_OUT',].contain(authState)) {
    const next = {
      'next': {
        'name': 'unlock',
        'href': 'http://localhost:8081/api/v1/authn/recovery/unlock',
        'hints': {
          'allow': [
            'POST',
          ],
        },
      },
    };
    Object.assign(authResp._links, next, cancelLink);
  }
  else if (['CONSENT_REQUIRED',].contain(authState)) {
    // TODO
    console.log('TODO: CONSENT State');
  }
  else {
    throw new Error(`unknown auth state ${authState}`);
  }

  authResp = {
    stateToken: stateToken,
    expiresAt: 'some expiration date',
    status: authState,
    type: 'TODO: stateToken.type',
  };
};

const recoveryPassword = () => {
  const resp = {
    'stateToken': 'testStateToken',
    'expiresAt': '2015-07-17T02:33:34.874Z',
    'status': 'PASSWORD_RESET',
    '_embedded': user,
    '_links': {
      'next': {
        'name': 'resetPassword',
        'href': 'http://localhost:9191/api/v1/authn/credentials/reset_password',
        'hints': {
          'allow': [
            'POST',
          ],
        },
      },
      'cancel': {
        'href': 'http://localhost:9191/api/v1/authn/cancel',
        'hints': {
          'allow': [
            'POST',
          ],
        },
      },
    },
  };
};
