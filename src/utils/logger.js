/**
 * Configurations of logger.
 */
const fs = require("fs");
const winston = require("winston");
const env = process.env.NODE_ENV || "development";

require("winston-daily-rotate-file");

//Creates the log folder if it doesn't exist
const logDirectory = `./logs/`;
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const loggerConfig = [
  new winston.transports.Console({
    colorize: true
  })
];

const log = new winston.createLogger({
  transports: loggerConfig
});

const successLog = log;
const errorLog = log;
const twitterLog = log;

successLog.add(
  new winston.transports.DailyRotateFile({
    name: "success",
    level: "info",
    filename: "./logs/success.log",
    datePattern: "YYYY-MM-DD",
    prepend: true,
    json: false
  })
);

errorLog.add(
  new winston.transports.DailyRotateFile({
    name: "error",
    level: "error",
    filename: "./logs/error.log",
    datePattern: "YYYY-MM-DD",
    prepend: true,
    json: false
  })
);

twitterLog.add(
  new winston.transports.DailyRotateFile({
    name: "twitter",
    level: "debug",
    filename: "./logs/twitter.log",
    datePattern: "YYYY-MM-DD",
    prepend: true,
    json: false
  })
);
if (env === "production") {
  errorLog.remove(winston.transports.Console);
  successLog.remove(winston.transports.Console);
  twitterLog.remove(winston.transports.Console);
}

module.exports = {
  successLog: successLog,
  errorLog: errorLog,
  twitterLog: twitterLog
};
