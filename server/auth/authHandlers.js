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

    //proceed to signup
    try {
      //check if user exists
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
    } catch (err) {
      res.status(500).send(err);
    }
  },
  logout: (req, res) => {
    req.logout();
    req.session.destroy(function () {
      res.clearCookie('connect.sid');
      //user will be undefined if logout was successful
      res.json(req.user);
    });
  },
};
