const axios = require("axios");
const Winston = require("../app/libraries/Winston");

class APIConnector {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
    this.api = axios.create({
      baseURL: this.apiBaseUrl,
    });

    this.buildBrydgeConfigOnAPI();
  }

  buildBrydgeConfigOnAPI() {
    this.buildLogger();
  }

  buildLogger() {
    this.api.interceptors.response.use(
      function (response) {
        Winston.info(response.data);
        return response;
      },
      function (error) {
        Winston.error(error.response);
        return Promise.reject(error.response);
      }
    );
  }
}

module.exports = APIConnector;
