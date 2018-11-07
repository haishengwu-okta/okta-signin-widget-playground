var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/v1/authn', function(req, res, next) {
  res.send(200);
});

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080');
});

