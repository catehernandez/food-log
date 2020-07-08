/**
 * Routes to render homepage when user is logged in
 */
const router = require('express-promise-router')();
const { ensureLoggedIn } = require('connect-ensure-login');

router.get('/dashboard', ensureLoggedIn('auth/login'), (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
