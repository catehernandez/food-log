/**
 * Database queries related to logs table.
 */
const db = require('./index');
const validator = require('validator');

/**
 * Retrieves a user's log for the given date. Returns null if no log is defined.
 *
 * @param { Number } user_id
 * @param { Date } date
 */
const findLog = (user_id, date) => {
  return db
    .query('SELECT * FROM logs WHERE user_id = $1 AND log_date=$2', [
      user_id,
      date,
    ])
    .then((results) => {
      if (results.rowCount == 0) return null;

      return results.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Creates a new log for the given date and returns the inserted entry.
 *
 * @param {Integer} user_id
 * @param {Date} date   Date for the new entry.
 */
const createLog = (user_id, date) => {
  return db
    .query('INSERT INTO logs (user_id, log_date) VALUES ($1, $2) RETURNING *', [
      user_id,
      date,
    ])
    .then((results) => {
      return results.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Returns an array of all a user's past logs in JSON format. Returns an empty
 * array if none are found.
 *
 * @param {Integer} user_id
 */
const getAllUserLogs = (user_id) => {
  return db
    .query('SELECT * FROM logs WHERE user_id=$1', [user_id])
    .then((results) => {
      return results.rows;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Retrieve logs matching the given month and year.
 *
 * @param {String} month  An integer from 1-12, represented as a String.
 * @param {String} year   An integer represented as a String.
 *
 * @return {Array} logs   An array of logs matching the given query or an empty
 *                          array if no logs are found.
 */
const getLogsByMonth = (month, year) => {
  //validate inputs
  if (!validator.isInt(month, { min: 1, max: 12 }))
    throw Error('Month must be an integer between 1-12');

  if (!validator.isInt(year))
    return res.status(404).json('Year must be an integer');

  return db
    .query(
      'SELECT * FROM logs WHERE EXTRACT(MONTH from log_date)=$1 AND EXTRACT(YEAR from log_date)=$2',
      [month, year]
    )
    .then((results) => {
      return results.rows;
    })
    .catch((err) => {
      throw err;
    });
};

const updateLog = (user_id, date, field, value) => {
  //Protect against SQL injection--check if passed field is modifiable
  const modifiable = new Set([
    'veg_count',
    'fruit_count',
    'protein_count',
    'grain_count',
  ]);

  if (!modifiable.has(field)) throw Error(`Unmodifiable Field: ${field}`);

  const query = `UPDATE logs SET ${field}=$1 WHERE user_id=$2 AND log_date=$3 RETURNING *`;

  return db
    .query(query, [value, user_id, date])
    .then((results) => {
      return results.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  findLog,
  createLog,
  getLogsByMonth,
  getAllUserLogs,
  updateLog,
};
