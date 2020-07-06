const db = require('../db');

/**
 * Searches usrs table and finds user by user_id.
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
 * Inserts new user into the database and returns the inserted row.
 *
 * @param   {String}    email       user email.
 * @param   {String}    hashedpass  user's hashed password.
 * @return  {Object}    user        JSON object representing the created user.
 */
const createUser = (email, hashedpass) => {
  return db
    .query(
      'INSERT INTO users (email, hashedpass) VALUES ($1, $2) RETURNING *',
      [email, hashedpass]
    )
    .then((results) => {
      let user = results.rows[0];
      console.log('user', user);
      return user;
    })
    .catch((e) => console.log(e));
};

module.exports = { findUser, findUserByEmail, createUser };
