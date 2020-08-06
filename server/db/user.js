/**
 * Database queries pertaining to users table.
 */
const db = require('./index');

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

/**
 * Function to update a user's goals.
 *
 * @param {Number} user_id            User's ID
 * @param {Number} vegetable_goals    Integer between 0 and 10 inclusive
 * @param {Number} fruit_goals        Integer between 0 and 10 inclusive
 * @param {Number} protein_goals      Integer between 0 and 10 inclusive
 * @param {Number} grain_goals        Integer between 0 and 10 inclusive
 */
const updateUser = (
  user_id,
  vegetable_goals,
  fruit_goals,
  protein_goals,
  grain_goals
) => {
  //Reject invalid inputs
  if (
    !Number.isInteger(vegetable_goals) ||
    !Number.isInteger(fruit_goals) ||
    !Number.isInteger(protein_goals) ||
    !Number.isInteger(grain_goals)
  ) {
    throw new Error('Invalid User Goals Input: Must be an Integer');
  }

  //else input into db
  return db
    .query(
      `UPDATE users
       SET (vegetable_goals, fruit_goals, protein_goals, grain_goals)= ($1, $2, $3, $4)
       WHERE user_id=$5 RETURNING *`,
      [vegetable_goals, fruit_goals, protein_goals, grain_goals, user_id]
    )
    .then((results) => {
      let user = results.rows[0];
      console.log(user);
      return user;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = { findUser, findUserByEmail, createUser, updateUser };
