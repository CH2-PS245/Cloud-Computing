const { DB_USERNAME, DB_NAME, DB_HOST, DB_PASS, DB_DIALECT } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
    timezone: "+07:00",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    timezone: "+07:00",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    timezone: "+07:00",
  },
};
