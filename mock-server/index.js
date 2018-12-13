const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const corsOptions = {
  origin: 'http://localhost:4001',
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, X-Okta-User-Agent-Extended, X-Okta-XsrfToken',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

const mkError = (errorSummary = "", errorCausesSummary = []) => {
  return {
    errorCauses: errorCausesSummary.map((s) => {
      return { errorSummary: s };
    }),
    errorCode: "E0000000",
    errorId: "xxxyyyyzzz",
    errorLink: "E0000000",
    errorSummary,
  }
}

let mockSettings = {
  config: []
};

const accountStatus = {
  UNLOCK: {
    "expiresAt": "2015-08-05T14:10:54.000Z",
    "status": "SUCCESS",
    "recoveryType": "UNLOCK",
    "sessionToken": "THE_SESSION_TOKEN",
    "_embedded": {
      "user": {
        "id": "00ui0jgywTAHxYGMM0g3",
        "profile": {
          "login": "administrator1@clouditude.net",
          "firstName": "Add-Min",
          "lastName": "O'Cloudy Tud",
          "locale": "en_US",
          "timeZone": "America/Los_Angeles"
        }
      }
    }
  },

  LOCKED_OUT: {
    "status": "LOCKED_OUT",
    "_embedded": {},
    "_links": {
      "next": {
        "name": "unlock",
        "href": "http://localhost:8081/api/v1/authn/recovery/unlock",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "cancel": {
        "href": "http://localhost:8081/api/v1/authn/cancel",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },

  PASSWORD_WARN: {
    "stateToken": "testStateToken",
    "expiresAt": "2015-07-08T16:43:47.608Z",
    "status": "PASSWORD_WARN",
    "_embedded": {
      "user": {
        "id": "00uhuhIeUK9Htah8Z0g3",
        "passwordChanged": "2015-06-28T01:05:35.000Z",
        "profile": {
          "login": "inca@clouditude.net",
          "firstName": "Inca-Louise",
          "lastName": "O'Rain Dum",
          "locale": "en_US",
          "timeZone": "America/Los_Angeles"
        }
      },
      "policy": {
        "expiration": {
          "passwordExpireDays": 4
        },
        "complexity": {
          "minLength": 8,
          "minLowerCase": 1,
          "minUpperCase": 1,
          "minNumber": 1,
          "minSymbol": 0
        }
      }
    },
    "_links": {
      "next": {
        "name": "changePassword",
        "href": "https://foo.com/api/v1/authn/credentials/change_password",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "skip": {
        "name": "skip",
        "href": "https://foo.com/api/v1/authn/skip",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "cancel": {
        "href": "https://foo.com/api/v1/authn/cancel",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },

  PASSWORD_EXPIRED: {
    "stateToken": "00zXV_boPAtyUu3_5qFHugbilbW4y54PxWM0f1kNKT",
    "expiresAt": "2018-11-08T18:01:23.000Z",
    "status": "PASSWORD_EXPIRED",
    "_embedded": {
      "user": {
        "id": "00uqbxPh7V77mxdho0g3",
        "passwordChanged": "2018-10-09T22:20:02.000Z",
        "profile": {
          "login": "inca@clouditude.net",
          "firstName": "Inca-Louise",
          "lastName": "O'Rain Dum",
          "locale": "en",
          "timeZone": "America/Los_Angeles"
        }
      },
      "policy": {
        "complexity": {
          "minLength": 8,
          "minLowerCase": 1,
          "minUpperCase": 1,
          "minNumber": 1,
          "minSymbol": 0,
          "excludeUsername": true
        },
        "age": {
          "minAgeMinutes": 0,
          "historyCount": 0
        }
      }
    },
    "_links": {
      "next": {
        "name": "changePassword",
        "href": "http://localhost:8080/api/v1/authn/credentials/change_password",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "cancel": {
        "href": "http://localhost:8080/api/v1/authn/cancel",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  }
}
const factorObjects = {
  OKTA_SECURITY_QUESTION: {
    "id": "ufs2cqqeDQpd1Y3QJ0g4",
    "factorType": "question",
    "provider": "OKTA",
    "vendorName": "OKTA",
    "profile": {
      "question": "favorite_movie_quote",
      "questionText": "What is your favorite movie quote?"
    },
    "_links": {
      "verify": {
        "href": "http://localhost:8080/api/v1/authn/factors/ufs2cqqeDQpd1Y3QJ0g4/verify",
        "hints": {
          "allow": ["POST"]
        }
      }
    }
  },
  OKTA_SMS: {
    "id": "sms2gt8gzgEBPUWBIFHN",
    "factorType": "sms",
    "provider": "OKTA",
    "status": "ACTIVE",
    "created": "2014-06-27T20:27:26.000Z",
    "lastUpdated": "2014-06-27T20:27:26.000Z",
    "profile": {
      "phoneNumber": "+1-555-415-1337"
    },
    "_links": {
      "verify": {
        "href": "http://localhost:8080/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms2gt8gzgEBPUWBIFHN/verify",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "http://localhost:8080/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms2gt8gzgEBPUWBIFHN",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      },
      "user": {
        "href": "http://localhost:8080/api/v1/users/00u15s1KDETTQMQYABRL",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    }
  },
  GOOGLE_TOTP: {
    "id": "sms2gt8gzgEBPUWBIFHN",
    "factorType": "token:software:totp",
    "provider": "GOOGLE",
    "_links": {
      "verify": {
        "href": "http://localhost:8080/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms2gt8gzgEBPUWBIFHN/verify",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "enroll": {
        "href": "http://localhost:8080/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  OKTA_PUSH: {
    "id": "opf1emz8qeuVPx5El1d8",
    "factorType": "push",
    "provider": "OKTA",
    "vendorName": "OKTA",
    "profile": {
      "credentialId": "richard.heng@okta.com",
      "deviceType": "SmartPhone_IPhone",
      "keys": [{
        "kty": "PKIX",
        "use": "sig",
        "kid": "default",
        "x5c": ["NIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlL+fjHX6jvBoXkzWCqsYAcmtzw7A5Cmu6Pf0Uvkv/+v0M77QNY491S2nvPCdRo2rYWD4wLelq9wCaL2sH/bN69joqRkSJYps1+5Bfh/KxBOqPWGsSb5Oxv6QD0Mgkseg1swefdEibZttwxoqFdsPhCa45wsZaIkfwr8ontxXMWKVVknI60Fd50cqA0fzp2nF4hsGs49vIirQ+aiDZ1ymwKq1QA53C71+03F1iJrXWF0eTXqyU/aCjsD6o/VIZZAsq+R3kbka2gGbqz6Pu3QYmhDURjjYz4pJoXKfDTrwrQqtLcUZQrzoS+LYi7jiVvU7s9cyIal4pBOOkHoiu+0RUQIDAQAB"]
      }],
      "name": "Richard’s iPhone",
      "platform": "IOS",
      "version": "12.0"
    },
    "_links": {
      "verify": {
        "href": "http://localhost:8080/api/v1/authn/factors/opf1emz8qeuVPx5El1d8/verify",
        "hints": {
          "allow": ["POST"]
        }
      }
    }
  },
  OKTA_CALL: {
    "id": "clf193zUBEROPBNZKPPE",
    "factorType": "call",
    "provider": "OKTA",
    "profile": {
      "phoneNumber": "+1 XXX-XXX-1337"
    },
    "_links": {
      "verify": {
        "href": "http://localhost:8080/api/v1/authn/factors/clf193zUBEROPBNZKPPE/verify",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  OKTA_EMAIL: {
    "id": "emfnf3gSScB8xXoXK0g3",
    "factorType": "email",
    "provider": "OKTA",
    "vendorName": "OKTA",
    "status": "PENDING_ACTIVATION",
    "profile": {
      "email": "foo@test.com",
    },
    "_links": {
      "verify": {
        "href": "http://localhost:8080/api/v1/authn/factors/clf193zUBEROPBNZKPPE/verify",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "activate": {
        "href": "http://localhost:8080/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3/lifecycle/activate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "resend": [
        {
          "name": "email",
          "href": "http://localhost:8080/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3/resend",
          "hints": {
            "allow": [
              "POST"
            ]
          }
        }
      ],
      "self": {
        "href": "http://localhost:8080/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "user": {
        "href": "http://localhost:8080/api/v1/users/00umvfJKwXOQ1mEL50g3",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    }
  },
  FIDO: {
    "id": "webauthnFactorId",
    "factorType": "webauthn",
    "provider": "FIDO",
    "vendorName": "FIDO",
    "profile": { "credentialId": "credentialId" },
    "_embedded": { "challenge": { "nonce": "NONCE", "timeoutSeconds": 20 } },
    "_links": {
      "next": {
        "name": "verify",
        "href": "https://foo.com/api/v1/authn/factors/webauthnFactorId/verify",
        "hints": { "allow": ["POST"] }
      },
      "cancel": { "href": "https://foo.com/api/v1/authn/cancel", "hints": { "allow": ["POST"] } },
      "prev": { "href": "https://foo.com/api/v1/authn/previous", "hints": { "allow": ["POST"] } }
    }
  }
}

let mockFactors;

function finalReponse(res) {
  if (mockSettings.config.filter(kv => kv.key === 'SUCCESS').length > 0) {
    res.json({ "expiresAt": "2018-11-07T21:06:59.000Z", "status": "SUCCESS", "sessionToken": "20111YmUsD3n5ytUGvmQXeHJ2f4dtYhVBznaJYZMuARaLcJIKz4TG5A", "_embedded": { "user": { "id": "00uqbtiaptVVLmjCd0g3", "passwordChanged": "2018-10-09T22:20:02.000Z", "profile": { "login": "administrator1@clouditude.net", "firstName": "Add-Min", "lastName": "O'Cloudy Tud", "locale": "en", "timeZone": "America/Los_Angeles" } } } });
  } else {
    res.status(401);
    res.json(mkError("Invalid value provided."));
  }
}

app.post('/config', function (req, res, next) {
  mockSettings = req.body;
  res.json({ success: 'success' });
});

app.post('/api/v1/authn', function (req, res, next) {
  if (mockSettings.config.filter(kv => kv.key === 'LOCKED_OUT').length > 0) {
    res.json(accountStatus['LOCKED_OUT']);
  }
  else if (mockSettings.config.filter(kv => kv.key === 'UNLOCK').length > 0) {
    res.json(accountStatus['UNLOCK']);
  }
  else if (mockSettings.config.filter(kv => kv.key === 'PASSWORD_WARN').length > 0) {
    res.json(accountStatus['PASSWORD_WARN']);
  }
  else if (mockSettings.config.filter(kv => kv.key === 'PASSWORD_EXPIRED').length > 0) {
    res.json(accountStatus['PASSWORD_EXPIRED']);
  }
  else if (mockSettings.config.filter(kv => kv.key === 'MFA_REQUIRED').length > 0) {
    const children = mockSettings.config.filter(kv => kv.key === 'MFA_REQUIRED')[0].children;
    mockFactors = children.map(child => factorObjects[child])
      .filter(factor => !!factor);
    if (children.includes('OKTA_PUSH')) {
      mockFactors = mockFactors.concat({
        "id": "ost1emz8qetG6ttDr1d8",
        "factorType": "token:software:totp",
        "provider": "OKTA",
        "vendorName": "OKTA",
        "profile": {
          "credentialId": "richard.heng@okta.com"
        },
        "_links": {
          "verify": {
            "href": "https://okta.okta.com/api/v1/authn/factors/ost1emz8qetG6ttDr1d8/verify",
            "hints": {
              "allow": ["POST"]
            }
          }
        }
      });
    }
    res.json({
      "stateToken": "00X3E_Clhvnjn-zVIivFgWdG3JtX3l-wspPtSSH5yG",
      "expiresAt": "2018-11-08T18:16:47.000Z",
      "status": "MFA_REQUIRED",
      "_embedded": {
        "user": {
          "id": "00u1a88eqk3fypdNi1d8",
          "passwordChanged": "2018-10-29T16:59:02.000Z",
          "profile": {
            "login": "richard.heng@okta.com",
            "firstName": "Richard",
            "lastName": "Heng",
            "locale": "en",
            "timeZone": "America/Los_Angeles"
          }
        },
        "factors": mockFactors,
        "policy": {
          "allowRememberDevice": false,
          "rememberDeviceLifetimeInMinutes": 0,
          "rememberDeviceByDefault": false,
          "factorsPolicyInfo": {
            "opf1emz8qeuVPx5El1d8": {
              "autoPushEnabled": true
            }
          }
        }
      },
      "_links": {
        "cancel": {
          "href": "http://localhost:8080/api/v1/authn/cancel",
          "hints": {
            "allow": ["POST"]
          }
        }
      }
    });
  }

  else if (mockSettings.config.filter(kv => kv.key === 'SUCCESS').length > 0) {
    finalReponse(res);
  }
  else {
    res.status(401);
    res.json(mkError("Authentication failed"));
  }
});

app.post('/api/v1/users/:userId/factors/:factorId/verify', function (req, res, next) {
  finalReponse(res);
});

app.post('/api/v1/users/:userId/factors', function (req, res, next) {
  finalReponse(res);
});

app.post('/api/v1/authn/factors/:factorId/verify', function (req, res, next) {
  const factorId = req.params.factorId;
  const factor = mockFactors.filter((f) => f.id === factorId);
  if (mockSettings.config.filter(kv => kv.key === 'PASSWORD_EXPIRED').length > 0) {
    res.json({ "stateToken": "00VXyMVirQsranoRXat5qOUSQ_J7WhGazAhW4Kssz2", "expiresAt": "2018-11-08T17:50:14.000Z", "status": "PASSWORD_EXPIRED", "_embedded": { "user": { "id": "00uqbxPh7V77mxdho0g3", "passwordChanged": "2018-10-09T22:20:02.000Z", "profile": { "login": "inca@clouditude.net", "firstName": "Inca-Louise", "lastName": "O'Rain Dum", "locale": "en", "timeZone": "America/Los_Angeles" } }, "policy": { "complexity": { "minLength": 8, "minLowerCase": 1, "minUpperCase": 1, "minNumber": 1, "minSymbol": 0, "excludeUsername": true }, "age": { "minAgeMinutes": 0, "historyCount": 0 } } }, "_links": { "next": { "name": "changePassword", "href": "http://localhost:8080/api/v1/authn/credentials/change_password", "hints": { "allow": ["POST"] } }, "cancel": { "href": "http://localhost:8080/api/v1/authn/cancel", "hints": { "allow": ["POST"] } } } });
  }
  else if (req.body.answer === 'fail') {
    res.status(403);
    res.json(mkError("Invalid Passcode/Answer", ["Your answer doesn't match our records. Please try again."]));
  }
  else if (factor.length === 1) {
    finalReponse(res);
  } else {
    res.status(401);
    res.json(mkError("Authentication failed"));
  }
});

app.get('/api/v1/registration/form', function (req, res, next) {
  if (mockSettings.config.filter((o) => o.key === 'schema').length) {
    res.json({ "policyId": "reg3h8seELACUgy3p0g4", "lastUpdate": 1540847616000, "profileSchema": { "properties": { "firstName": { "type": "string", "title": "First name", "maxLength": 50, "default": "string" }, "lastName": { "type": "string", "title": "Last name", "maxLength": 50, "default": "string" }, "password": { "type": "string", "title": "Password", "allOf": [{ "description": "At least 8 character(s)", "minLength": 8 }, { "description": "At least 1 number(s)", "format": "/[\\d]+/" }, { "description": "At least 1 lowercase letter(s)", "format": "/[a-z]+/" }, { "description": "At least 1 uppercase letter(s)", "format": "/[A-Z]+/" }, { "description": "Does not contain part of username", "format": "/^[#/userName]/" }], "default": "Password" }, "email": { "type": "email", "title": "Email", "format": "email", "default": "Email" } }, "required": ["email", "password", "firstName", "lastName"], "fieldOrder": ["email", "password", "firstName", "lastName"] } });
  } else {
    res.status(401);
    res.json(mkError("Not Supported Registration Schema"));
  }
});

app.post('/api/v1/registration/reg3h8seELACUgy3p0g4/register', function (req, res, next) {
  if (mockSettings.config.filter((o) => o.key === 'register').length) {
    res.json({ activationToken: "" });
  } else {
    res.status(401);
    res.json(mkError("Not Supported Registration"));
  }
});

app.post('/api/v1/authn/recovery/unlock', function (req, res, netx) {
  res.json({
    factorResult: "WAITING",
    factorType: "EMAIL",
    recoveryType: "UNLOCK",
    status: "RECOVERY_CHALLENGE"
  });
});

app.post('/api/v1/authn/cancel', function (req, res, next) {
  res.json({});
});

app.post('/api/v1/authn/credentials/change_password', function (req, res, next) {
  finalReponse(res);
});

app.get('/login/getimage', function (req, res, next) {
  res.json({ "result": "success", "pwdImg": "/img/security/hello.png", "imageDescription": "" });
});


app.listen(9191, function () {
  console.log('CORS-enabled web server listening on port 9191');
});
