//Starts up server

const env = process.env.NODE_ENV || "development";

const express = require("express");
const app = express();

const config = require("config");
const port = config.get("port");

require("./startup/routes")(app);
require("./startup/db")();

const server = app.listen(port);

module.exports = server;
