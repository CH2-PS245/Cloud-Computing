"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const database = require("../connection/database");
const { renderModels } = require("../helpers");

const sequelize = database.sequelize;
var db = {};

console.log("[server] Connecting database...");
sequelize
  .authenticate()
  .then((res) => {
    console.log("[server] Successfully connected to database");
  })
  .catch((err) => {
    console.error(`[server] database connection failed [${err.message}]`);
  });

const models = renderModels(__dirname, sequelize);
Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db = { sequelize, Sequelize, ...models };

module.exports = db;
