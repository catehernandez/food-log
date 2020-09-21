const validator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const UserDB = require('../db/user');

module.exports = {
  signup: async (req, res) => {
    const { email, password } = req.body;
    const isValidEmail = validator.isEmail(email);
    const isValidPwd = validator.isLength(password, { min: 8, max: 35 });

    //validate inputs
    if (!isValidEmail) return res.status(400).json('Invalid email');
    if (!isValidPwd)
      return res.status(400).json('Password must be 8-35 characters');

    try {
      //check if user exists
      const user = await UserDB.findUserByEmail(email);

      if (user != null) {
        res.status(400).json('A user is already registered with this address');
      }

      //create new user in db
      else {
        const hashedpass = await bcrypt.hash(password, saltRounds);
        const normalizedEmail = validator.normalizeEmail(email);
        const user = await UserDB.createUser(normalizedEmail, hashedpass);

        //login newly created user.
        req.login(user, function (err) {
          if (err) res.sendStatus(500);

          res.status(200).json(user);
        });
      }
    } catch (err) {
      res.sendStatus(500);
    }
  },
  logout: (req, res) => {
    req.logout();
    req.session.destroy(function () {
      res.clearCookie('session');
      //user will be undefined if logout was successful
      res.json(req.user);
    });
  },
};
