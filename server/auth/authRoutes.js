const router = require('express-promise-router')();
const passport = require('passport');

const authHandlers = require('./authHandlers');

//all routes prepended by auth
router.post('/signup', authHandlers.signup);
router.get('/logout', authHandlers.logout);
/* passport.authenticate executes login flow defined in services/passport */
router.post(
  '/login',
  passport.authenticate('local', { failWithError: true }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
