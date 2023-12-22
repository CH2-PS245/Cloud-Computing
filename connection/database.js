require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_USERNAME, DB_NAME, DB_HOST, DB_PASS } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  dialectoptions: {
    socketpath: "dishdash-project:asia-southeast2:dishdash",
  },
});

const connection = async () => {
  try {
    await sequelize
      .authenticate()
      .then((connected) => console.log("Successfully connected to database"));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connection, sequelize };
