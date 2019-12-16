const express = require("express");
const artists = require("../routes/artists");
const birthdays = require("../routes/birthdays");
const contact = require("../routes/contacts");
const cors = require("cors");
const path = require("path");

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, "../../../build")));

  app.use("/", artists);
  app.use("/api", birthdays);
  app.use("/api", contact);
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../../../build", "index.html"));
  });
};
