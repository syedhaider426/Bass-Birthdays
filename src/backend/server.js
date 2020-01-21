//Starts up server

const express = require("express");
const app = express();

//Gets the required port number
const config = require("config");
const port = config.get("port");

// Initializes the routes/db
require("./startup/routes")(app);
require("./startup/db")();

// Starts the server on the port specified
const server = app.listen(port);

module.exports = server;
