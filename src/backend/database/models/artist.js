const mongoose = require("mongoose");

var artistSchema = mongoose.Schema({
  artist: {
    type: String
  },
  birthday: {
    type: Date
  }
});

var Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
