import express, { Application } from "express";
import { Server } from "http";
import { keys } from "./config/keys";

const app: Application = express();

// Initializes the routes/db
require("./startup/routes")(app);
require("./startup/db")();

// Starts the server on the port specified
const server: Server = app.listen(keys.port, () =>
  console.log(`Listening on ${keys.port}`)
);

module.exports = server;
