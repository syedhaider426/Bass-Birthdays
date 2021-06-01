/*
 * Configurations of logger.
 */
import fs from "fs"; //used to create directory if it doesn't exist
import winston from "winston"; //handles the different levels of logging
import * as DailyRotateFile from "winston-daily-rotate-file"; //this allows 3 different log files to be generated every day (twitter, error, and success)

const env: string = process.env.NODE_ENV || "development";

//Creates the log folder if it doesn't exist
const logDirectory: string = `./logs/`;
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Initially adds the console transport
const loggerConfig = [new winston.transports.Console({})];

//Creates the winston logger
const log = winston.createLogger({
  transports: loggerConfig,
});

//Creates 3 separate winston loggers
const successLog = log;
const errorLog = log;
const twitterLog = log;

/* If the production environment is used, add the logger files;
 * else log to the console
 */
if (env === "production") {
  successLog.add(
    new DailyRotateFile({
      name: "success",
      level: "info",
      filename: "./logs/success.log",
      datePattern: "YYYY-MM-DD",
      prepend: true,
      json: false,
    })
  );

  errorLog.add(
    new DailyRotateFile({
      name: "error",
      level: "error",
      filename: "./logs/error.log",
      datePattern: "YYYY-MM-DD",
      prepend: true,
      json: false,
    })
  );

  twitterLog.add(
    new DailyRotateFile({
      name: "twitter",
      level: "info",
      filename: "./logs/twitter.log",
      datePattern: "YYYY-MM-DD",
      prepend: true,
      json: false,
    })
  );

  errorLog.remove(winston.transports.Console);
  successLog.remove(winston.transports.Console);
  twitterLog.remove(winston.transports.Console);
}

export { successLog, errorLog, twitterLog };
