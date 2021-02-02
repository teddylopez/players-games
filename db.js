require('dotenv').config()
const {Pool} = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.PG_PORT,
});

module.exports = pool;
