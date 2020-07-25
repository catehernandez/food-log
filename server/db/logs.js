/**
 * Database queries related to logs table.
 */
const db = require('./index');

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
const updateLog = async (user_id, date) */

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

module.exports = { findLog, createLog, getAllUserLogs, updateLog };
