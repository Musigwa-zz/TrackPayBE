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
      amount: { type: Sequelize.DECIMAL, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("repayments");
  },
};
