//Starts up server

const env = process.env.NODE_ENV || "development";
if (env == "production") {
  process.env.NODE_CONFIG_DIR = "../backend/config";
} else {
  process.env.NODE_CONFIG_DIR = "./config";
}

const express = require("express");
const app = express();

const config = require("config");
const port = config.get("port");
const cron = require("node-cron");
require("./startup/routes")(app);
require("./startup/db")();

const server = app.listen(port);

module.exports = server;
