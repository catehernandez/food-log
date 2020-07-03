const express = require('express');
const router = express.Router();

const validator = require('validator');
const bcrypt = require('bcrypt');

const passport = require('passport');

//all routes prepended by auth
router.post('/signup', (req, res) => {
  const { email } = req.body;
  const isEmailValid = validator.isEmail(email);

  if (!isEmailValid) {
    res.status(400).send('Invalid email');
  }

  //proceed to signup
  else {
    res.status(201).json(email);
  }
});

module.exports = router;
