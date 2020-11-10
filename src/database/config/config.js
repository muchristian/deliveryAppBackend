const urlParser = require('url');
const url = 'postgres://pbtasqbfxoatwa:e8d10a0739a758ae89ff3fac38de6cc22ab98da6f2403c8cc8ba018fe3cbd08f@ec2-54-159-112-44.compute-1.amazonaws.com:5432/d3lvoavj269lid'
const q = urlParser.parse(url, true);

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
