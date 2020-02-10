const mongoose = require("mongoose");

// Creates the schema for an Artist
var artistSchema = mongoose.Schema({
  Artist: {
    type: String
  },
  Birthday: {
    type: Date
  },
  SpotifyID: {
    type: String
  },
  ProfileImage: {
    type: String
  },
  Genre: {
    type: Array
  },
  Twitter: {
    type: String
  },
  Horoscope: {
    type: String
  }
});

// Creates the model for an Artist
var Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
