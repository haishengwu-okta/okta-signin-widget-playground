const oktaQuestion = {
  'id': 'x-factor-okta-question',
  'factorType': 'question',
  'provider': 'OKTA',
  'vendorName': 'OKTA',
  'profile': {
    'question': 'disliked_food',
    'questionText': 'What is the food you least liked as a child?',
  },
  '_links': {
    'verify': {
      'href': 'http://localhost:9191/api/v1/authn/factors/x-factor-okta-question/verify',
      'hints': {
        'allow': [ 'POST', ],
      },
    },
  },
};

const oktaSms = {
  'id': 'x-factor-okta-sms',
  'factorType': 'sms',
  'provider': 'OKTA',
  'vendorName': 'OKTA',
  'profile': {
    'phoneNumber': '+1 XXX-XXX-6688',
  },
  '_links': {
    'verify': {
      'href': 'http://localhost:9191/api/v1/authn/factors/x-factor-okta-sms/verify',
      'hints': {
        'allow': [ 'POST', ],
      },
    },
  },
};

module.exports = [
  oktaQuestion,
  oktaSms,
];
