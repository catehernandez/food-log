/**
 * Contains configuration for passport.js
 */
const bcrypt = require('bcrypt');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserDB = require('../db/user');

/** passport config */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', //By default passport looks for 'username'
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserDB.findUserByEmail(email);

        //user not found
        if (!user) {
          return done(null, false);
        }

        //check password
        const pwdIsValid = await bcrypt.compare(password, user.hashedpass);

        if (!pwdIsValid) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
  const user = await UserDB.findUser(user_id);

  done(null, user);
});
