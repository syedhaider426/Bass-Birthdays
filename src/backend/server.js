//Starts up server

const env = process.env.NODE_ENV || "development";
console.log("Current environment", env);
console.error("Current environment", env);
if (env == "production") {
  process.env.NODE_CONFIG_DIR = "../backend/config";
} else {
  process.env.NODE_CONFIG_DIR = "./config";
}

const express = require("express");
const app = express();

const config = require("config");
const port = config.get("port");

require("./startup/routes")(app);
require("./startup/db")();

const server = app.listen(port);

module.exports = server;
