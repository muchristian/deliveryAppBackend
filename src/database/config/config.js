const url = require('url');
const q = url.parse(process.env.DATABASE_URL, true);

module.exports = {
  development: {
    username: "postgres",
    password: "chris32",
    database: "deliverapp",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "chris32",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: q.user,
    password: q.pass,
    database: d.path,
    host: q.host,
    dialect: "postgres",
  },
};
