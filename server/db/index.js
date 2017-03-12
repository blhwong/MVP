var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spotify');

var db = mongoose.connection;

var listEntry = mongoose.Schema({
  artist: String,
  track: String,
  date: {type: Date, default: Date.now}
});

var listEntry = mongoose.model('listEntry', listEntry);

module.exports = {
  db: db,
  listEntry: listEntry
};