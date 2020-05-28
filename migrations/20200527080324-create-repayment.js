"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("repayments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: { type: Sequelize.INTEGER, allowNull: false },
      seasonId: { type: Sequelize.INTEGER, allowNull: true },
      amount: { type: Sequelize.FLOAT, allowNull: false },
      prevBalance: { type: Sequelize.FLOAT, allowNull: false },
      totalRepaid: { type: Sequelize.FLOAT, allowNull: false },
      totalCredit: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      deletedAt: { default: null, type: Sequelize.DATE },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("repayments");
  },
};
