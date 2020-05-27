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
      amount: { type: DataTypes.DECIMAL, allowNull: false },
    },
    { tableName: "repayments", timestamps: true, paranoid: true }
  );
  Repayment.associate = function ({ Customer }) {
    Repayment.belongsTo(Customer, {
      foreignKey: "id",
      as: "clientId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  return Repayment;
};
