"use strict";
module.exports = (sequelize, DataTypes) => {
  const Repayment = sequelize.define(
    "Repayment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Customer", key: "id" },
      },
      seasonId: { type: DataTypes.INTEGER, allowNull: true },
      amount: { type: DataTypes.FLOAT, allowNull: false },
      prevBalance: { type: DataTypes.FLOAT, allowNull: false },
      totalRepaid: { type: DataTypes.FLOAT, allowNull: false },
      totalCredit: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      tableName: "repayments",
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["deletedAt", "updatedAt"] },
        where: { deletedAt: null },
      },
      paranoid: true,
    }
  );
  Repayment.associate = function ({ Customer, Season }) {
    Repayment.belongsTo(Customer, {
      foreignKey: "customerId",
      as: "customer",
      onDelete: " CASCADE",
      hooks: true,
    });
    Repayment.belongsTo(Season, {
      foreignKey: "seasonId",
      as: "season",
      onDelete: " CASCADE",
      hooks: true,
    });
  };
  return Repayment;
};
