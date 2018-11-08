var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, X-Okta-User-Agent-Extended, X-Okta-XsrfToken',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

var config = {};
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
    "id": "opf3hkfocI4JTLAju0g4",
    "factorType": "push",
    "provider": "OKTA",
    "profile": {
      "credentialId": "dade.murphy@example.com",
      "deviceType": "SmartPhone_IPhone",
      "name": "Gibson",
      "platform": "IOS",
      "version": "9.0"
    },
    "_links": {
      "verify": {
        "href": "http://localhost:8080/api/v1/authn/factors/opf3hkfocI4JTLAju0g4/verify",
        "hints": {
          "allow": [
            "POST"
          ]
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
  }
}

app.post('/config', function(req, res, next) {
  config = req.body;
  res.json({success: 'success'});
});

app.post('/api/v1/authn', function(req, res, next) {
  if (config.config.filter(kv => kv.key === 'MFA_CHALLENGE').length > 0) {
    const children = config.config.filter(kv => kv.key === 'MFA_CHALLENGE')[0].children;
    console.log(config);
    console.log(children);
    const factors = children.map(child => {
      return factorObjects[child];
    })
    .filter(factor => factor !== null);
    console.log(factors);
    res.json({
      "stateToken": "00CBqQBP4AK64nnx44drxYY9gH2scLLQKd3URrXvni",
      "expiresAt": "2018-11-07T21:06:55.000Z",
      "status": "MFA_REQUIRED",
      "_embedded": {
        "user": {
          "id": "00uqbtiaptVVLmjCd0g3",
          "passwordChanged": "2018-10-09T22:20:02.000Z",
          "profile": {
            "login": "administrator1@clouditude.net",
            "firstName": "Add-Min",
            "lastName": "O'Cloudy Tud",
            "locale": "en",
            "timeZone": "America/Los_Angeles"
          }
        },
        "factors": factors,
        "policy": {
          "allowRememberDevice": false,
          "rememberDeviceLifetimeInMinutes": 0,
          "rememberDeviceByDefault": false,
          "factorsPolicyInfo": {}
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
  } else {
    res.json({"expiresAt":"2018-11-07T20:36:19.000Z","status":"SUCCESS","sessionToken":"20111Ur6KD4SUsGGZ48Aa0iwlVeM3nMNuDxkLjDyCJ9YpDA19pnkbjN","_embedded":{"user":{"id":"00uqbtiaptVVLmjCd0g3","passwordChanged":"2018-10-09T22:20:02.000Z","profile":{"login":"administrator1@clouditude.net","firstName":"Add-Min","lastName":"O'Cloudy Tud","locale":"en","timeZone":"America/Los_Angeles"}}}});
  }
});

app.post('/api/v1/users/:userId/factors/:factorId/verify', function(req, res, next) {
  res.json({"expiresAt":"2018-11-07T21:06:59.000Z","status":"SUCCESS","sessionToken":"20111YmUsD3n5ytUGvmQXeHJ2f4dtYhVBznaJYZMuARaLcJIKz4TG5A","_embedded":{"user":{"id":"00uqbtiaptVVLmjCd0g3","passwordChanged":"2018-10-09T22:20:02.000Z","profile":{"login":"administrator1@clouditude.net","firstName":"Add-Min","lastName":"O'Cloudy Tud","locale":"en","timeZone":"America/Los_Angeles"}}}});
});

app.post('/api/v1/users/:userId/factors', function(req, res, next) {
  res.json({"expiresAt":"2018-11-07T21:06:59.000Z","status":"SUCCESS","sessionToken":"20111YmUsD3n5ytUGvmQXeHJ2f4dtYhVBznaJYZMuARaLcJIKz4TG5A","_embedded":{"user":{"id":"00uqbtiaptVVLmjCd0g3","passwordChanged":"2018-10-09T22:20:02.000Z","profile":{"login":"administrator1@clouditude.net","firstName":"Add-Min","lastName":"O'Cloudy Tud","locale":"en","timeZone":"America/Los_Angeles"}}}});
});

app.post('/api/v1/authn/factors/:factorId/verify', function(req, res, next) {
  res.json({"expiresAt":"2018-11-07T21:06:59.000Z","status":"SUCCESS","sessionToken":"20111YmUsD3n5ytUGvmQXeHJ2f4dtYhVBznaJYZMuARaLcJIKz4TG5A","_embedded":{"user":{"id":"00uqbtiaptVVLmjCd0g3","passwordChanged":"2018-10-09T22:20:02.000Z","profile":{"login":"administrator1@clouditude.net","firstName":"Add-Min","lastName":"O'Cloudy Tud","locale":"en","timeZone":"America/Los_Angeles"}}}});
});

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080');
});
