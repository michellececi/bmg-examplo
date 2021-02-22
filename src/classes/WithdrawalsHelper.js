const axios = require("axios");
const CheckoutPartner = require("./Zoop");
const { Withdrawals, BalanceUsers } = require("../app/models");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const moment = require("moment");
const APIConnector = require("./APIConnector");
const version1 = "/v1";

const Checkout = new CheckoutPartner();

class WithdrawalsHelper extends APIConnector {
  constructor() {
    super(process.env.BALANCE_API_URL);
  }

  async createWithdrawalOnBrydgeAndPartner(
    BankAccount,
    withdrawal,
    CompanyNetwork
  ) {
    const BalanceUser = await BalanceUsers.findOne({
      where: {
        id: BankAccount.id_balance_user,
      },
    });

    const balance = await this.getBalance(
      CompanyNetwork,
      BalanceUser.type,
      BalanceUser.token
    );

    if (balance >= withdrawal.amount) {
      const transferOnPartner = await Checkout.transferToBankAccount(
        BankAccount.id_zoop,
        withdrawal.amount,
        CompanyNetwork.name
      );

      const transferOnBrydge = this.saveWithdrawalOnBrydge(
        transferOnPartner,
        CompanyNetwork.id,
        BalanceUser.id,
        BankAccount.id
      );
      return transferOnBrydge;
    }
    return false;
  }

  async getBalance(CompanyNetwork, balanceUserType, balanceUserToken) {
    const { token: networkToken } = CompanyNetwork;

    if (balanceUserType === "seller") {
      const response = await this.api.get(
        `${version1}/network/${networkToken}/balance/seller/${balanceUserToken}`,
        {
          headers: {
            api_key: CompanyNetwork.api_key,
          },
        }
      );
      const { data } = response;

      return data.balance.available;
    }

    if (balanceUserType === "company_network") {
      const response = await this.api.get(
        `${version1}/network/${networkToken}/balance/company-network`,
        {
          headers: {
            api_key: CompanyNetwork.api_key,
          },
        }
      );
      const { data } = response;
      return data.balance.available;
    }
  }

  async saveWithdrawalOnBrydge(
    transferData,
    CompanyNetworkId,
    BalanceUserId,
    BankAccountId
  ) {
    return Withdrawals.create({
      id_company_network: CompanyNetworkId,
      id_balance_user: BalanceUserId,
      id_bank_account: BankAccountId,
      id_zoop: transferData.id,
      token: uuidv4(),
      status: transferData.status,
      amount: transferData.amount,
    });
  }

  async changeStatusFromOpenWithdrawals() {
    const OpenWithdrawals = await Withdrawals.findAll({
      where: {
        [Op.or]: [
          { status: "created" },
          { status: "confirmed" },
          { status: "pending" },
        ],
      },
    });

    await Promise.all(
      OpenWithdrawals.map(async (withdrawal) => {
        const resultPartner = await Checkout.getStatusWithdrawal(
          withdrawal.id_zoop
        );

        await this.updateStatusOnBrydge(withdrawal.token, resultPartner.status);
      })
    );

    const FailedWithdrawal = await Withdrawals.findAll({
      where: { status: "failed" },
    });

    await Promise.all(
      FailedWithdrawal.map(async (withdrawalFailed) => {
        await Withdrawals.update(
          {
            failed_at: moment(),
          },
          {
            where: {
              token: withdrawalFailed.token,
            },
          }
        );
      })
    );
  }

  async updateStatusOnBrydge(token, status) {
    await Withdrawals.update(
      {
        status,
        update_at: moment(),
      },
      {
        where: {
          token,
        },
      }
    );
  }
}

module.exports = new WithdrawalsHelper();
