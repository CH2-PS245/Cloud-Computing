const { sequelize } = require("../models");

const DatabasesInitialize = async () => {
  await sequelize.sync({
    force: true,
    alter: true,
  });
  console.log("Cleaning databases....");
};

DatabasesInitialize();
