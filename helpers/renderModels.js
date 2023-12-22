const path = require("path");
const fs = require("fs");

const { DataTypes } = require("sequelize");

module.exports = function renderModels(dir, sequelize) {
  const models = {};
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      Object.assign(models, renderModels(filePath, sequelize));
    } else if (file.endsWith(".js") && file !== "index.js") {
      const model = require(filePath)(sequelize, DataTypes);
      models[model.name] = model;
    }
  });
  return models;
};
