/**
 * Database queries pertaining to users table.
 */
const db = require('./index');
const validator = require('validator');

/**
 * Searches users table and finds user by user_id.
 *
 * @param {Integer}   user_id
 * @return {Object}   JSON object representing a user or NULL if no user
 *                    is found.
 */
const findUser = (user_id) => {
  return db
    .query('SELECT * FROM users WHERE user_id=$1', [user_id])
    .then((results) => {
      //if no user was found
      if (results.rowCount === 0) return null;

      return results.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Searches users table and finds user by email.
 *
 * @param {String} email    unique user email.
 * @return {Object}         JSON object representing a user or NULL if no user
 *                          is found.
 */
const findUserByEmail = (email) => {
  const normalizedEmail = validator.normalizeEmail(email);

  return db
    .query('SELECT * FROM users WHERE email=$1', [normalizedEmail])
    .then((results) => {
      //if no user was found
      if (results.rowCount === 0) return null;

      return results.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Inserts new user into the database and returns the inserted row.
 *
 * @param   {String}    email       user email.
 * @param   {String}    hashedpass  user's hashed password.
 * @return  {Object}    user        JSON object representing the created user.
 */
const createUser = (email, hashedpass) => {
  const normalizedEmail = validator.normalizeEmail(email);

  return db
    .query(
      'INSERT INTO users (email, hashedpass) VALUES ($1, $2) RETURNING *',
      [normalizedEmail, hashedpass]
    )
    .then((results) => {
      let user = results.rows[0];
      return user;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = { findUser, findUserByEmail, createUser };
