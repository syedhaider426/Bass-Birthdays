declare module "winston-daily-rotate-file" {
  import { DailyRotateFileTransportInstance } from "winston-daily-rotate-file/types";

  const DailyRotateFile: DailyRotateFileTransportInstance;

  export = DailyRotateFile;
}
