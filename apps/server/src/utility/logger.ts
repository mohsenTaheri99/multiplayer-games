import { createLogger, format, transports } from "winston";

const environment = process.env.NODE_ENV || "development";

const logger = createLogger({
  level: "info", // Default log level
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    environment === "development"
      ? format.combine(
          format.colorize(), // Add colors for development
          format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] [${level}]:  ${message}`;
          })
        )
      : format.json() // JSON for production
  ),
  transports: [
    new transports.Console(), // Console logs with color in development
    new transports.File({ filename: "logs/app.log" }), // File logs
  ],
});

export default logger;
