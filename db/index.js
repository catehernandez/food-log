/**
 * Database configuration file.
 *
 * All database interactions go through this file. Don't have to configure db
 * connection in multiple places, easy to reconfigure, and easy to log results/
 * run diagnostics on many queries at once. See node-postgres docs for details.
 *
 * @file database configuration file.
 * @author zenon21
 * @since 6.18.20
 */
require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
}); //testing auto populate with env data?

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
