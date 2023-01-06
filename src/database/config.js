const promise = require('bluebird');

const initOptions = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(initOptions);

const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  allowExitOnIdle: true,
};

module.exports = pgp(connection);
