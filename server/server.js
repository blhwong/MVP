var express = require('express');
var app = express();
var config = require('../config/config');
var queryString = require('query-string');
var cookieParser = require('cookie-parser');

app.set('port', 3000);

app.use(express.static(__dirname + '/../client'));

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

var generateRandomString = function(length) {
  var string = '';
  var possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  for (var i = 0; i < length; i++) {
    var random = Math.floor(Math.random() * possible.length);
    string += possible.charAt(random);
  }
  return string;
};

var stateKey = 'spotify_auth_state';

app.get('/login', function(req, res) {
  var scope = 'user-read-recently-played user-top-read';
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  var query = {
    client_id: config.client_id,
    response_type: 'code',
    redirect_uri: config.redirect_uri,
    state: state,
    scope: scope
  };
  res.redirect('https://accounts.spotify.com/authorize?' + queryString.stringify(query));
});

app.get('/home', function(req, res) {
  var code = req.query.code
  var state = req.query.state;
  var error = req.query.error;
  var cookieState = req.cookies ? req.cookies[stateKey] : null;
  console.log(cookieState, state);
  if (state === null || cookieState !== state) {
    res.redirect('/#' +
      queryString.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.send('Logged in!');
  }

  // res.send('Logged in!');
});

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
