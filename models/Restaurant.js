const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate({ Menu }) {
      this.hasMany(Menu, {
        as: "menu",
        foreignKey: "restoId",
        targetKey: "idNumber",
        onDelete: "cascade",
      });
    }
  }

  Restaurant.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      idNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
      place: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Restaurant",
      tableName: "tb_restaurants",
    }
  );

  return Restaurant;
};
