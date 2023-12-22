const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate() {
      this.belongsTo(Food, {
        as: "menu",
        foreignKey: "foodId",
        targetKey: "idNumber",
      });
    }
  }

  Food.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      idNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isFastFood: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      jenisOlahan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      energiKalori: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      protein: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      lemak: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      karbohidrat: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      images: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Food",
      tableName: "tb_foods",
    }
  );

  return Food;
};
