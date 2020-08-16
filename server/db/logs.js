/**
 * Database queries related to logs table.
 */
const db = require('./index');
const validator = require('validator');

/**
 * Retrieves a user's log for the given date.
 *
 * @param { Number } user_id
 * @param { Date } date
 *
 * @return {Promise}  Promise object returns the matching log or null if no such
 *                    log exists.
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
 *
 * @return {Promise}    Promise object returns the newly inserted log.
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
 * Get all users's pas logs.
 *
 * @param {Integer} user_id
 *
 * @return {Promise}  Promise object returns an array of all a user's past logs
 *                    in JSON format, or an empty array if none are found.
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
 * Retrieve user's logs within the given month and year.
 *
 * @param {String} month  An integer from 1-12, represented as a String.
 * @param {String} year   An integer represented as a String.
 *
 * @return {Promise}      Promise object returns an array of logs matching the
 *                        given query or an empty array if no such logs are found.
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

/**
 * Updates the daily count of a category in a user's log.
 *
 * @param {number} user_id
 * @param {string} date     date to identifying the log to be updated.
 * @param {string} field    A column of the log in the db. Must be one of:
 *                          veg_count, fruit_count, protein_count or grain_count.
 * @param {number} value    the new value for the given field/
 *
 * @return {Promise}  Promise object returns the updated log.
 */
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
