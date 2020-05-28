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
        allowNull: false,
        references: { model: "Season", key: "id" },
      },
      totalRepaid: { type: DataTypes.FLOAT, allowNull: false },
      totalCredit: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      tableName: "customerSummaries",
      defaultScope: {
        attributes: { exclude: ["deletedAt", "updatedAt"] },
        where: { deletedAt: null },
      },
      timestamps: true,
      paranoid: true,
    }
  );

  CustomerSummary.associate = function ({ Customer, Season }) {
    CustomerSummary.belongsTo(Customer, {
      foreignKey: "customerId",
      as: "customer",
      onDelete: " CASCADE",
      hooks: true,
    });
    CustomerSummary.belongsTo(Season, {
      foreignKey: "seasonId",
      as: "season",
      onDelete: " CASCADE",
      hooks: true,
    });
  };
  return CustomerSummary;
};
