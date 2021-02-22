const path = require("path");
process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env." + process.env.NODE_ENV),
});

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const Rollbar = require("./app/libraries/Rollbar");
const Youch = require("youch");

class Server {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.invalidRoutes();
    this.exception();

    this.createHTTPServer();
  }

  middlewares() {
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    this.express.use(require("./routes"));
  }

  protectedRoutes() {
    this.express.use(require("./protected-routes"));
  }

  invalidRoutes() {
    this.express.use(require("./invalid-routes"));
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      let message = "Internal Server Error";
      Rollbar.enviarLog(err);

      if (process.env.NODE_ENV !== "production") {
        const youch = new Youch(err);
        message = await youch.toJSON();
      }

      return res.status(500).send({ message });
    });
  }

  createHTTPServer() {
    this.express.listen(process.env.PORT);
    console.log(`Server rodando na porta ${process.env.PORT}`);
  }
}

module.exports = new Server().express;
