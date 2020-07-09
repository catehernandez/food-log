/**
 * Routes to render homepage when user is logged in
 */
const router = require('express-promise-router')();
const { ensureLoggedIn } = require('connect-ensure-login');

const LogsDB = require('../db/logs');

/** testing */
router.get('/dashboard', ensureLoggedIn('auth/login'), (req, res) => {
  res.status(200).json({ user: req.user });
});

router.post('/createLog', ensureLoggedIn('auth/login'), async (req, res) => {
  const now = new Date();
  const results = await LogsDB.createLog(req.user.user_id, now);

  res.status(200).send(results);
});

router.get('/allLogs', ensureLoggedIn('/auth/login'), async (req, res) => {
  const results = await LogsDB.getAllUserLogs(req.user.user_id);

  res.status(200).send(results);
});

router.get('/currentLog', ensureLoggedIn('/auth/login'), async (req, res) => {
  const now = new Date();

  const results = await LogsDB.findLog(req.user.user_id, now);

  res.status(200).send(results);
});
module.exports = router;
