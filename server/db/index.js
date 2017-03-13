var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spotify');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected to MMMMM');
});

var bodyEntry = mongoose.Schema({
  username: String,
  body: String,
  date: {type: Date, default: Date.now}
});

var bodyEntry = mongoose.model('bodyEntry', bodyEntry);

module.exports = {
  db: db,
  bodyEntry: bodyEntry
};