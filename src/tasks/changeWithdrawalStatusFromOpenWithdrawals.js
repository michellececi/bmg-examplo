const WithdrawalsHelper = require("../classes/WithdrawalsHelper");

const cron = require("node-cron");

cron.schedule("*/30 * * * * *", function () {
  WithdrawalsHelper.changeStatusFromOpenWithdrawals();
});
