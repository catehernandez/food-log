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

//maybe this should just be "getLog"--if time is set on clientend
router.get('/currentLog', async (req, res) => {
  if (!req.user) return res.status(401).json('Unauthorized');

  //for testing only -- determine time on client end, i think
  //so that "now" is dependent on user & not server timezone
  const now = new Date();

  const user = req.user;
  const results = await LogsDB.findLog(user.user_id, now);

  res.status(200).json(results);
});

//get date from body or params?
router.post('/createLog', async (req, res) => {
  if (!req.user) return res.status(401).json('Unauthorized');

  const user = req.user;
  const { date } = req.body;

  try {
    const newLog = await LogsDB.createLog(user.user_id, date);
    res.status(200).json(newLog);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
