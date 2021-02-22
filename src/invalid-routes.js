const express = require("express");
const invalidRoutes = express.Router();
const Routes404 = require("./classes/Routes404");

invalidRoutes.get("*", Routes404.invalidRoute404);
invalidRoutes.post("*", Routes404.invalidRoute404);
invalidRoutes.put("*", Routes404.invalidRoute404);
invalidRoutes.delete("*", Routes404.invalidRoute404);
invalidRoutes.patch("*", Routes404.invalidRoute404);

module.exports = invalidRoutes;
