const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Profile }) {
      this.hasOne(Profile, {
        as: "profile",
        foreignKey: "user_id",
        targetKey: "id",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,

        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "User",
      tableName: "tb_users",
    }
  );

  return User;
};
