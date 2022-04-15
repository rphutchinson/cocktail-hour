import { createLogger, format, transports } from "winston";
const { combine, timestamp, prettyPrint, colorize } = format;

export default createLogger({
  format: combine(timestamp(), prettyPrint(), colorize()),
  transports: [
    new transports.Console({
      level: "info",
    }),
  ],
});
