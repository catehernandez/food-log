const express = require('express');
const router = express.Router();

const validator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');

const UserDB = require('../db/user');

//all routes prepended by auth
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const isEmailValid = validator.isEmail(email);

  if (!isEmailValid) {
    res.status(400).send('Invalid email');
  }

  //proceed to signup
  else {
    const user = await UserDB.findUserByEmail(email);

    if (user != null) {
      res.status(400).send('A user is already registered with this address');
    }
    //create new user in db
    else {
      //hash password
      bcrypt.hash(password, saltRounds).then((hashedpass) => {
        //Add to db
        UserDB.createUser(email, hashedpass)
          .then((results) => res.status(201).json({ userid: results }))
          .catch((e) => res.status(500).send(e));
      });
    }
  }
});

module.exports = router;
