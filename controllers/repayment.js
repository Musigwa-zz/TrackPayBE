const { statusCodes, errorMessages } = require("../constants");
const models = require("../models");
const { CustomerSummary, Season, Customer, Repayment } = models;
/**
 * @description The [RepaymentController] request handlers context
 * @class RepaymentController
 */

const query = {
  attributes: { exclude: ["seasonId", "customerId"] },
  include: [
    {
      model: Season,
      as: "season",
      attributes: ["id", "name", "startDate"],
      order: [["startDate", "DESC"]],
    },
    {
      model: Customer,
      as: "customer",
      attributes: ["id", "fullName"],
    },
  ],
};

class RepaymentController {
  /**
   * @description Make a new Repayment
   * @static
   * @param  {any} { body } The body object from extracted the request object
   * @param  {any} res The http response object to be sent back to the requester
   * @return {any} custom http response object or an error
   * @memberof RepaymentController
   */
  static async make({ body }, res) {
    let { amount, customerId, seasonId } = body;
    const where = { customerId };
    if (seasonId) where.seasonId = seasonId;
    const customerSummary = await CustomerSummary.findAll({ where, ...query });
    if (customerSummary.length <= 0) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: errorMessages.NOT_FOUND,
      });
    }
    const { customer } = customerSummary[0].get();
    if (seasonId) {
      /**
       * TODO: Increment the totalRepaid, then
       */
      const [firstSummary] = customerSummary;
      const { id, totalRepaid, totalCredit, season } = firstSummary.get();
      await CustomerSummary.update(
        { totalRepaid: totalRepaid + amount },
        { where: { id }, returning: true }
      );
      await Repayment.create({
        customerId,
        seasonId,
        amount,
        prevBalance: totalRepaid,
        totalRepaid: totalRepaid + amount,
        totalCredit,
      });
      return res.status(statusCodes.OK).json({
        customer,
        repayment: {
          season,
          amount,
          prevBalance: totalRepaid,
          totalRepaid: totalRepaid + amount,
          totalCredit,
        },
        action: "override",
      });
    }
    const targets = customerSummary
      .filter((s) => s.get().totalCredit > s.get().totalRepaid)
      .map((s) => ({
        ...s.get(),
        debt: s.get().totalCredit - s.get().totalRepaid,
      }));
    if (targets.length === 0) {
      /**
       * If the client has no outstanding credit in any season:
       * TODO: Apply the whole amount to the latest season
       */
      const [latest] = customerSummary.reverse();
      const {
        id: oId,
        totalRepaid: repaid,
        season: oS,
        totalCredit: oCr,
      } = latest.get();
      await CustomerSummary.update(
        { totalRepaid: repaid + amount },
        { where: { id: oId }, returning: true }
      );
      await Repayment.create({
        customerId,
        seasonId: oS.get().id,
        amount,
        prevBalance: repaid,
        totalRepaid: repaid + amount,
        totalCredit: oCr,
      });
      return res.status(statusCodes.OK).json({
        customer,
        repayment: {
          season: oS,
          amount,
          prevBalance: repaid,
          totalRepaid: repaid + amount,
          totalCredit: oCr,
        },
        action: "overpaid",
      });
    }
    const cascaded = [];
    for (let target of targets) {
      /**
       * If amount <= debt:
       * TODO: increment [totalRepaid] by amount, and break the loop
       * Otherwise:
       * TODO: increment [totalRepaid] by debt, and decrement the amount by debt
       */
      const {
        id: tId,
        totalRepaid: paid,
        season: s,
        debt,
        totalCredit: cCredit,
      } = target;
      let shouldBreak = false;
      if (amount <= debt) shouldBreak = true;
      const topUp = shouldBreak ? amount : debt;
      await CustomerSummary.update(
        { totalRepaid: paid + topUp },
        { where: { id: tId }, returning: true }
      );
      await Repayment.create({
        customerId,
        seasonId: s.get().id,
        amount: topUp,
        prevBalance: paid,
        totalRepaid: paid + topUp,
        totalCredit: cCredit,
      });
      cascaded.push({
        season: s,
        amount: topUp,
        prevBalance: paid,
        totalRepaid: paid + topUp,
        totalCredit: cCredit,
      });
      if (shouldBreak) break;
      amount -= debt;
    }
    return res.status(statusCodes.OK).json({
      customer,
      repayments: cascaded,
      action: "cascaded",
    });
  }
}

module.exports = RepaymentController;
