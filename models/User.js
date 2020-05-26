const { sign } = require("jsonwebtoken");
const { JWT_KEY } = require("../constants");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      fullName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
    },
    {
      tableName: "users",
      timestamps: true,
      paranoid: true,
      hooks: {
        afterCreate(user, _options) {
          user.dataValues.token = user.generateToken();
        },
      },
    }
  );

  User.associate = function (_models) {
    // associations can be defined here
  };

  User.prototype.generateToken = function () {
    return sign({ id: this.id, email: this.email }, JWT_KEY);
  };
  return User;
};
