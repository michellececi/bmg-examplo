const Winston = require("../libraries/Winston");

module.exports = async (req, res, next) => {
  const { headers, body, url } = req;

  const requestInformations = {
    url,
    headers,
    body,
  };

  Winston.info(requestInformations);

  next();
};
