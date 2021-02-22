const { CompanyNetworks } = require("../models");

module.exports = async (req, res, next) => {
  const { api_key } = req.headers;

  if (!api_key) {
    return res.status(400).send({
      status: "error",
      msg: "API Key not found!",
    });
  }

  const companyNetwork = await CompanyNetworks.findOne({
    where: { api_key },
  });

  if (!companyNetwork || companyNetwork.api_key !== api_key) {
    return res.status(401).send({
      status: "error",
      msg: "Invalid API Key",
    });
  }

  return next();
};
