const express = require('express');
const router = express.Router();

const validator = require('validator');
const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../db');

/**
 * Find user by email in database.
 *
 * @param {String}  email   the given email.
 * @return {Int}   userId  userId if user exists or NULL if no user exists.
 */
const findUserByEmail = (email) => {
  db.query('SELECT user_id FROM users WHERE email=$1', [email])
    .then((results) => {
      //e.g. no results found
      if (results.rowCount == 0) return null;

      const userID = results.rows[0].user_id;

      console.log('userID', userID);
      return userID;
    })
    .catch((e) => console.error(e));
};

//all routes prepended by auth
router.post('/signup', (req, res) => {
  const { email } = req.body;
  const isEmailValid = validator.isEmail(email);

  if (!isEmailValid) {
    res.status(400).send('Invalid email');
  }

  //proceed to signup
  else {
    const user = findUserByEmail(email);

    console.log('user', user);

    //check if email address is in use
    if (user != null) {
      res.status(400).send('A user is already registered with this address');
    }
    //create new user
    else {
      res.status(201).send('sign up');
    }
  }
});

module.exports = router;
