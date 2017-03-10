var express = require('express');
var app = express();

app.set('port', 3000);

app.use(express.static(__dirname + '/../client'));

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
