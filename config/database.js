const dotenv = require("dotenv");

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_NAME_DEV, DB_HOST, DB_PORT } = process.env;

const common = {
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
  // use_env_variable: DB_URL
};

module.exports = {
  development: {
    ...common,
    database: DB_NAME_DEV,
  },
  test: {
    ...common,
    database: "trackpaytest",
  },
};
