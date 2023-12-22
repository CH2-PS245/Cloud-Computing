const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate({ Restaurant, Food }) {
      this.belongsTo(Restaurant, {
        as: "restaurant",
        foreignKey: "restoId",
        targetKey: "idNumber",
      });

      this.belongsTo(Food, {
        as: "food",
        foreignKey: "foodId",
        targetKey: "idNumber",
      });
    }
  }

  Menu.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      restoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      secondaryId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      menuName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      place: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Menu",
      tableName: "tb_menus",
    }
  );

  return Menu;
};
