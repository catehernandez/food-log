/**
 * Routes to render homepage when user is logged in
 */
const router = require('express-promise-router')();

const LogsDB = require('../db/logs');

router.get('/allLogs', async (req, res) => {
  if (!req.user) {
    res.status(401).json('Unauthorized');
  } else {
    const user = req.user;
    const results = await LogsDB.getAllUserLogs(user.user_id);

    res.status(200).json(results);
  }
});

router.get('/currentLog', async (req, res) => {
  if (!req.user) return res.status(401).json('Unauthorized');

  const now = new Date(); //for testing only

  const user = req.user;
  const results = await LogsDB.findLog(user.user_id, now);

  res.status(200).json(results);
});

module.exports = router;
