const mongoose = require("mongoose");

// Creates the schema for an Artist
var artistSchema = mongoose.Schema({
  Artist: {
    type: String
  },
  Birthday: {
    type: Date
  },
  spotifyID: {
    type: String
  },
  profileImage: {
    type: String
  },
  Genre: {
    type: Array
  },
  twitter: {
    type: String
  }
});

// Creates the model for an Artist
var Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
