"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("customerSummaries", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      customerId: { type: Sequelize.INTEGER, allowNull: false },
      seasonId: { type: Sequelize.INTEGER, allowNull: true },
      totalRepaid: { type: Sequelize.DECIMAL, allowNull: false },
      totalCredit: { type: Sequelize.DECIMAL, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("customerSummaries");
  },
};
