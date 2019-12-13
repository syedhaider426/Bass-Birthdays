const mongoose = require("mongoose");

var artistSchema = mongoose.Schema({
  artist: {
    type: String
  },
  birthday: {
    type: Date
  },
  spotifyID: {
    type: String
  },
  profileImage: {
    type: String
  },
  genres: {
    type: Array
  }
});

var Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
