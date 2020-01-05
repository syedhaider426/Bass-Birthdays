const mongoose = require("mongoose");

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

var Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
