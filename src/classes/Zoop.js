const Rollbar = require("../app/libraries/Rollbar");
const APIConnector = require("./APIConnector");

class Zoop extends APIConnector {
  constructor() {
    super(process.env.ZOOP_API_URL);

    this.username = process.env.ZOOP_USERNAME;
    this.password = process.env.ZOOP_PASSWORD;
    this.basicAuth = this.generateBasicAuth();
  }

  generateBasicAuth() {
    return Buffer.from(`${this.username}:${this.password}`).toString("base64");
  }

  generateHeaders() {
    return {
      authorization: `Basic ${this.basicAuth}`,
      "content-type": "application/json",
      "accept-type": "application/json",
    };
  }

  async transferToBankAccount(bankAccountId, valueAmount, CompanyNetworkName) {
    try {
      const amountInCents = valueAmount * 100;

      const response = await this.api.post(
        process.env.ZOOP_API_URL +
          "bank_accounts/" +
          bankAccountId +
          "/transfers",
        {
          amount: amountInCents,
          statement_descriptor: CompanyNetworkName,
          description: "Payment Made",
        },
        {
          headers: this.generateHeaders(),
        }
      );
      const { data } = response;

      return data;
    } catch (err) {
      Rollbar.enviarLog(err);
      throw new Error("Error to create a new transfer");
    }
  }

  async getStatusWithdrawal(transferId) {
    try {
      const response = await this.api.get(
        process.env.ZOOP_API_URL + "transfers/" + transferId,
        {
          headers: this.generateHeaders(),
        }
      );
      const { data } = response;

      return data;
    } catch (err) {
      Rollbar.enviarLog(err);
      throw new Error("Error to get a transfers");
    }
  }
}
module.exports = Zoop;
