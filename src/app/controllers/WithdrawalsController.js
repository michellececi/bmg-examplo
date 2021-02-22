const { Withdrawals, CompanyNetworks } = require("../models");

class WithdrawalsController {
  async get(req, res) {
    const { tokenWithdrawal, networkToken } = req.params;

    const CompanyNetwork = await CompanyNetworks.findOne({
      where: {
        token: networkToken,
      },
    });

    const Withdrawal = await Withdrawals.findOne({
      where: {
        token: tokenWithdrawal,
        id_company_network: CompanyNetwork.id,
      },
      attributes: [
        "id",
        "token",
        "status",
        "amount",
        "created_at",
        "failed_at",
        "succeed_at",
      ],
      raw: true,
    });

    return res.send({
      success: true,
      withdrawal: Withdrawal,
    });
  }
}

module.exports = new WithdrawalsController();
