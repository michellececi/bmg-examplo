const axios = require("axios");
const APIConnector = require("./APIConnector");

class BrydgeBalance extends APIConnector {
  constructor() {
    super(process.env.BALANCE_API_URL);
  }

  async savePaymentBalance(cpf, networkToken, transactionValue) {
    const TRANSACTION_TYPE_NAME = "Cashout";
    const currentDate = new Date();

    try {
      await this.api.post(`/network/${networkToken}/balance/${cpf}`, {
        type_transaction: TRANSACTION_TYPE_NAME,
        type_operation: null,
        type_cashin: null,
        value: transactionValue,
        date_mov: currentDate,
      });

      return true;
    } catch (err) {
      throw new Error("Error to create a new bank statement");
    }
  }
}
module.exports = new BrydgeBalance();
