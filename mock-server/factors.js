const oktaQuestion = {
    "id": "questionId",
    "factorType": "question",
    "provider": "OKTA",
    "vendorName": "OKTA",
    "profile": {
      "question": "disliked_food",
      "questionText": "What is the food you least liked as a child?"
    },
    "_links": {
      "verify": {
        "href": "http://localhost:9191/api/v1/authn/factors/questionId/verify",
        "hints": {
          "allow": [ "POST" ]
        }
      }
    }
  },

module.exports = [ oktaQuestion ];
