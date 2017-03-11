var express = require('express');
var app = express();
var config = require('../config/config');
var queryString = require('query-string');
var cookieParser = require('cookie-parser');
var request = require('request');

app.set('port', 3000);

app.use('/', express.static(__dirname + '/../client'));
app.use('/main', express.static(__dirname + '/../client'));

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
  if (!state || cookieState !== state) {
    console.log('State mismatch!');
    res.redirect('/login#' + queryString.stringify({error: 'state_mismatch'}));
  } else {
    // res.send('Logged in!');
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
        // console.log('============res', res);
        // console.log('============body', res);
        var access_token = body.access_token;
        var refresh_token = body.refresh_token;
        // console.log(access_token, refresh_token);
        // console.log(access_token);
        // console.log(refresh_token);
        console.log(body);
        // var access_token = body.access_token;
        console.log(access_token);
        var type = 'artists';
        url = 'https://api.spotify.com/v1/me/top/' + type;
        options = {
          url: url,
          headers: {
            Authorization: 'Bearer ' + access_token
          },
          qs: {
            limit: 50,
            time_range: 'long_term'
          },
          json: true
        };
        console.log(options.url);
        request.get(options, function(err, response, body) {
          if (!err && response.statusCode === 200) {
            console.log('==========long term');
            // console.log(body);
          } else {
            console.log('Error! ', err);
          }
        });

        // url = 'https://api.spotify.com/v1/me/top/' + type;
        options.url = url;
        options.qs.time_range = 'medium_term';
        request.get(options, function(err, response, body) {
          if (!err && response.statusCode === 200) {
            console.log('==========medium term');
            // console.log(body);
          } else {
            console.log('Error! ', err);
          }
        });

        // url = 'https://api.spotify.com/v1/me/top/' + type;
        options.url = url;
        options.qs.time_range = 'short_term';
        request.get(options, function(err, response, body) {
          if (!err && response.statusCode === 200) {
            console.log('==========short term');
            // console.log(body);
          } else {
            console.log('Error! ', err);
          }
        });
        type = 'tracks';
        url = 'https://api.spotify.com/v1/me/top/' + type;
        options.url = url;
        options.qs.time_range = 'long_term';
        request.get(options, function(err, response, body) {
          if (!err && response.statusCode === 200) {
            console.log('==========long term');
            // console.log(body);
          } else {
            console.log('Error! ', err);
          }
        });
        // url = 'https://api.spotify.com/v1/me/top/' + type;
        options.url = url;
        options.qs.time_range = 'medium_term ';
        request.get(options, function(err, response, body) {
          if (!err && response.statusCode === 200) {
            console.log('==========medium term');
            // console.log(body);
          } else {
            console.log('Error! ', err);
          }
        });
        // url = 'https://api.spotify.com/v1/me/top/' + type;
        options.url = url;
        options.qs.time_range = 'short_term';
        request.get(options, function(err, response, body) {
          if (!err && response.statusCode === 200) {
            console.log('==========short term');
            // console.log(body);
          } else {
            console.log('Error! ', err);
          }
        });

        var currentOptions = {
          url: 'https://api.spotify.com/v1/me/player/recently-played',
          headers : {
            Authorization: 'Bearer ' + access_token
          },

        };
        request.get(currentOptions, function(err, response, body) {
          console.log('================current');
          // console.log(body);
        });


        res.redirect('/main#' + queryString.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/login#' + queryString.stringify({ error: 'invalid_token'}));
      }
    });

  }

  // res.send('Logged in!');
});

// app.get('/refresh_token', function(req, res) {
//   console.log('in refresh token');
//   // requesting access token from refresh token
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 'Authorization': 'Basic ' + (new Buffer(config.client_id + ':' + config.client_secret).toString('base64')) },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.send({
//         'access_token': access_token
//       });
//     }
//   });
// });

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
