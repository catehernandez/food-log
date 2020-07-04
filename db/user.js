const db = require('../db');

/**
 * Searches users table and finds user by email.
 *
 * @param {String} email    unique user email.
 * @return {Object}         returns a JSON object representing a user or NULL if
 *                          no user is found.
 */
const findUserByEmail = (email) => {
  return db
    .query('SELECT * FROM users WHERE email=$1', [email])
    .then((results) => {
      //if no user was found
      if (results.rowCount === 0) return null;

      return results.rows[0];
    })
    .catch((e) => console.log(e));
};

/**
 * Inserts new user into the database and returns the user_id for the new entry.
 *
 * @param   {String}    email       user email.
 * @param   {String}    hashedpass  user's hashed password.
 * @return  {Integer}   user_id     user_id for the newly inserted entry.
 */
const createUser = (email, hashedpass) => {
  return db
    .query(
      'INSERT INTO users (email, hashedpass) VALUES ($1, $2) RETURNING user_id',
      [email, hashedpass]
    )
    .then((results) => {
      let user_id = results.rows[0].user_id;
      console.log('userid', user_id);
      return user_id;
    })
    .catch((e) => console.log(e));
};

module.exports = { findUserByEmail, createUser };
