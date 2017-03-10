var express = require('express');
var app = express();
var config = require('../config/config');
var queryString = require('query-string');

app.set('port', 3000);

app.use(express.static(__dirname + '/../client'));

app.get('/login', function(req, res) {

});

var stateKey = 'spotify_auth_state';

app.get('/login', function(req, res) {

});

app.get('/home', function(req, res)) {
  res.send('Logged in!');
};

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
