/**
 * Configurations of logger.
 */
const winston = require("winston");
const env = process.env.NODE_ENV;

require("winston-daily-rotate-file");

const loggerConfig = [
  new winston.transports.Console({
    colorize: true
  })
];

const log = new winston.createLogger({
  transports: loggerConfig
});

const successLog = log;
const errorlog = log;
const twitterLog = log;
if (env === "production") {
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

  errorlog.add(
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

  errorLog.remove(winston.transports.Console);
  successLog.remove(winston.transports.Console);
  twitterLog.remove(winston.transports.Console);
}

module.exports = {
  successlog: successLog,
  errorlog: errorlog,
  twitterLog: twitterLog
};
