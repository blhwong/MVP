var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spotify');

var db = mongoose.connection;

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