var express = require('express');
var app = express();
var config = require('../config/config');
var queryString = require('query-string');
var cookieParser = require('cookie-parser');
var request = require('request');

app.set('port', 3000);

app.use('/', express.static(__dirname + '/../client'));

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
  var scope = 'user-read-recently-played user-top-read user-read-private user-read-birthdate user-read-email';
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
  if (!state || cookieState !== state) {
    console.log('State mismatch!');
    res.redirect('/login#' + queryString.stringify({error: 'state_mismatch'}));
  } else {
    console.log('Logged in!');
    res.cookie(stateKey);
    var options = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.redirect_uri
      },
      headers: {
        Authorization: 'Basic ' + (new Buffer(config.client_id + ':' + config.client_secret).toString('base64'))
      },
      json: true
    };
    request.post(options, function(err, response, body) {
       if (!err && res.statusCode === 200) {
        console.log('Post Success!');
        var access_token = body.access_token;
        var refresh_token = body.refresh_token;

        var currentUserOptions = {
          url:'https://api.spotify.com/v1/me',
          headers: {
            Authorization: 'Bearer ' + access_token
          },
          json: true
        };
        request.get(currentUserOptions, function(err, response, body) {
          if (!err && res.statusCode === 200) {
            console.log('body', body);
            var username = body.id;
            res.redirect('/#' + queryString.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
              username: body.id
            }));

          } else {
            res.redirect('/login#' + queryString.stringify({ error: 'invalid_token'}));
          }
        });

      } else {
        res.redirect('/login#' + queryString.stringify({ error: 'invalid_token'}));
      }
    });
  }
});

app.get('/create', function(req, res) {
  // request for current userprofile using web api
  // create profile
});

app.get('insert', function(req, res) {
  // insert to db
});

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
