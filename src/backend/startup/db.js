const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");

// "Initializes" the database
module.exports = function() {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
