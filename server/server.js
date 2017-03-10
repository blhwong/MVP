var express = require('express');
var app = express();
var config = require('../config/config');
var queryString = require('query-string');

app.set('port', 3000);

app.use(express.static(__dirname + '/../client'));

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
  res.send('Logged in!');
});

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
