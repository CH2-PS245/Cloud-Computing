const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate({ User }) {
      this.belongsTo(User, {
        as: "user",
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
    }
  }

  Profile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: true,
        validate: {
          isUUID: true,
        },
      },
      user_id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        validate: {
          isUUID: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sleepTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      job: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hourPerDay: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "tb_profiles",
    }
  );

  return Profile;
};
