const express = require("express");
const routes = express.Router();
const handler = require("express-async-handler");
const { errors } = require("celebrate");

const WithdrawalsController = require("./app/controllers/WithdrawalsController");

const version1 = "/v1";

routes.get(
  version1 + "/network/:networkToken/withdrawal/:tokenWithdrawal",
  handler(WithdrawalsController.get)
);

routes.use(errors());
module.exports = routes;
