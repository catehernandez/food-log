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

const isProduction = process.env.NODE_ENV === 'production';

//connection string for local dev using env variables
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

//both pool and query objects used elsewhere
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  pool,
};
