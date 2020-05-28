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
      seasonId: { type: Sequelize.INTEGER, allowNull: false },
      totalRepaid: { type: Sequelize.FLOAT, allowNull: false },
      totalCredit: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      deletedAt: { default: null, type: Sequelize.DATE },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("customerSummaries");
  },
};
