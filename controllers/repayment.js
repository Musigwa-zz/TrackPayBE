const { statusCodes, errorMessages } = require("../constants");
const models = require("../models");
const { CustomerSummary, Season, Customer } = models;
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
    if (seasonId) {
      /**
       * TODO: Increment the totalRepaid, then
       */
      const [firstSummary] = customerSummary;
      const { id, totalRepaid } = firstSummary.get();
      const [, override] = await CustomerSummary.update(
        { totalRepaid: totalRepaid + amount },
        { where: { id }, returning: true }
      );
      return res.status(statusCodes.OK).json({ override: override[0].get() });
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
      const { id: latestId, totalRepaid: repaid } = latest.get();
      const [, overpaid] = await CustomerSummary.update(
        { totalRepaid: repaid + amount },
        { where: { id: latestId }, returning: true }
      );
      return res.status(statusCodes.OK).json({ overpaid: overpaid[0].get() });
    }
    const cascaded = [];
    for (let target of targets) {
      /**
       * If amount <= debt:
       * TODO: increment [totalRepaid] by amount, and break the loop
       * Otherwise:
       * TODO: increment [totalRepaid] by debt, and decrement the amount by debt
       */
      const { id: tId, totalRepaid: paid, debt } = target;
      if (amount <= debt) {
        const [, cascade] = await CustomerSummary.update(
          { totalRepaid: paid + amount },
          { where: { id: tId }, returning: true }
        );
        cascaded.push(cascade[0]);
        break;
      } else {
        const [, continued] = await CustomerSummary.update(
          { totalRepaid: paid + debt },
          { where: { id: tId }, returning: true }
        );
        cascaded.push(continued[0]);
        amount -= debt;
      }
    }
    return res.status(statusCodes.OK).json({ cascaded });
  }
}

module.exports = RepaymentController;
