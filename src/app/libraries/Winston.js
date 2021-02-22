const { createLogger, format, transports } = require("winston");
require("winston-papertrail").Papertrail;

module.exports = createLogger({
  level: "info",
  format: format.json(),
  transports: [
    new transports.Papertrail({
      host: "logs3.papertrailapp.com",
      port: 16454,
      hostname: `cashout_${process.env.NODE_ENV}`,
    }),
  ],
});
