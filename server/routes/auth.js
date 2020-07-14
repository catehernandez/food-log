const router = require('express-promise-router')();

const validator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const passport = require('passport');

const UserDB = require('../db/user');

//all routes prepended by auth
router.get('/current_user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user_id: req.user.user_id });
  } else {
    res.json({ user_id: '' });
  }
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const isValidEmail = validator.isEmail(email);
  const isValidPwd = validator.isLength(password, { min: 8, max: 35 });

  if (!isValidEmail) {
    res.status(400).json('Invalid email');
  } //proceed to check password
  else if (!isValidPwd) {
    res.status(400).json('Password must be 8-35 characters');
  } //proceed to signup
  else {
    const user = await UserDB.findUserByEmail(email);

    if (user != null) {
      res.status(401).json('A user is already registered with this address');
    }

    //create new user in db
    else {
      //hash password
      const hashedpass = await bcrypt.hash(password, saltRounds);
      const user = await UserDB.createUser(email, hashedpass);

      res.json(user);
    }
  }
});

/* passport.authenticate executes login flow defined in services/passport */
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  //user will be undefined if logout was successful
  res.json(req.user);
});

module.exports = router;
