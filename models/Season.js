module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define(
    "Season",
    {
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { len: [3, 100], isAlphanumeric: true },
      },
      startDate: { type: DataTypes.DATE, allowNull: false, unique: true },
    },
    {
      tableName: "seasons",
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["deletedAt", "updatedAt"] },
        where: { deletedAt: null },
      },
      paranoid: true,
    }
  );
  Season.associate = function ({ CustomerSummary }) {
    Season.hasMany(CustomerSummary, {
      foreignKey: "seasonId",
      as: "season",
      onDelete: " CASCADE",
      hooks: true,
    });
  };
  return Season;
};
