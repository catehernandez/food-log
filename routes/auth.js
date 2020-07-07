const router = require('express-promise-router')();

const validator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const passport = require('passport');

const UserDB = require('../db/user');

//all routes prepended by auth
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const isValidEmail = validator.isEmail(email);
  const isValidPwd = validator.isLength(password, { min: 8, max: 35 });

  if (!isValidEmail) {
    res.status(400).send('Invalid email');
  } //proceed to check password
  else if (!isValidPwd) {
    res.status(400).send('Password must be 8-35 characters');
  } //proceed to signup
  else {
    const user = await UserDB.findUserByEmail(email);

    if (user != null) {
      res.status(400).send('A user is already registered with this address');
    }

    //create new user in db
    else {
      //hash password
      const hashedpass = await bcrypt.hash(password, saltRounds);
      const results = await UserDB.createUser(email, hashedpass);

      res.status(201).json({ user: results });
    }
  }
});

/* Renders login page */
router.get('/login', async (req, res) => {
  res.status(200).send('login page');
});

/* passport.authenticate executes login flow defined in services/passport */
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
  })
);

router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

module.exports = router;
