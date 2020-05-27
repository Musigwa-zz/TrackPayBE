const { sign } = require("jsonwebtoken");
const { JWT_KEY } = require("../constants");

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { len: [3, 100], isAlphanumeric: true },
      },
    },
    {
      tableName: "customers",
      timestamps: true,
      paranoid: true,
      hooks: {
        afterCreate(customer, _options) {
          customer.dataValues.token = customer.generateToken();
        },
      },
    }
  );

  Customer.prototype.generateToken = function () {
    return sign({ id: this.id }, JWT_KEY);
  };
  return Customer;
};
