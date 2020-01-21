const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");
module.exports = function() {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
