const express = require('express');
const router = express.Router();

const validator = require('validator');
const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../db');

//all routes prepended by auth
router.post('/signup', (req, res) => {
  const { email } = req.body;
  const isEmailValid = validator.isEmail(email);

  if (!isEmailValid) {
    res.status(400).send('Invalid email');
  }

  //proceed to signup
  else {
    db.query('SELECT user_id FROM users WHERE email=$1', [email])
      .then((results) => {
        if (results.rowCount > 0) {
          res
            .status(400)
            .send('A user is already registered with this address');
        }
        //email not in use--free to sign-up
        else {
          res.status(201).send('sign up');
        }
      })
      .catch((e) => console.log(e));
  }
});

module.exports = router;
