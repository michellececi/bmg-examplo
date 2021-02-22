class Rollbar {
  constructor() {
    this.accessToken = process.env.ROLLBAR_TOKEN;
  }

  enviarLog(error) {
    const Rollbar = require("rollbar");

    const rollbar = new Rollbar({
      accessToken: this.accessToken,
      captureUncaught: true,
      captureUnhandledRejections: true,
      environment: process.env.NODE_ENV,
    });

    rollbar.critical(error);
  }
}

module.exports = new Rollbar();
