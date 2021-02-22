const { Withdrawals } = require("../models");

class WithdrawalsController {
  async get(req, res) {
    const { tokenWithdrawal } = req.params;

    const Withdrawal = await Withdrawals.findOne({
      where: {
        token: tokenWithdrawal,
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
