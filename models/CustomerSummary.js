module.exports = (sequelize, DataTypes) => {
  const CustomerSummary = sequelize.define(
    "CustomerSummary",
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
      seasonId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "Season", key: "id" },
      },
      totalRepaid: { type: DataTypes.DECIMAL, allowNull: false },
      totalCredit: { type: DataTypes.DECIMAL, allowNull: false },
    },
    { tableName: "customerSummaries", timestamps: true, paranoid: true }
  );

  CustomerSummary.associate = function ({ Customer, Season }) {
    CustomerSummary.belongsTo(Customer, {
      foreignKey: "id",
      as: "clientId",
      onDelete: " CASCADE",
      hooks: true,
    });
    CustomerSummary.hasOne(Season, {
      foreignKey: "id",
      as: "season",
      onDelete: " CASCADE",
      hooks: true,
    });
  };
  return CustomerSummary;
};
