const router = require('express-promise-router')();

const db = require('../db');
const LogsDB = require('../db/logs');

/* getUsers route for testing only*/
const getUsers = (req, res) => {
  db.query('SELECT * FROM users')
    .then((results) => {
      res.status(200).json(results.rows);
    })
    .catch((err) => {
      throw err;
    });
};

const getCurrentUser = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(null);
  }
};

const getUsersLogs = async (req, res) => {
  if (!req.user) {
    res.status(401).json('Unauthorized');
  } else {
    const user = req.user;
    const results = await LogsDB.getAllUserLogs(user.user_id);

    res.status(200).json(results);
  }
};

//get date from body or params?
const createLog = async (req, res) => {
  if (!req.user) return res.status(401).json('Unauthorized');

  const user = req.user;
  const { date } = req.body;

  try {
    const newLog = await LogsDB.createLog(user.user_id, date);
    res.status(200).json(newLog);
  } catch (err) {
    res.status(500).send(err);
  }
};

router.get('/currentLog', async (req, res) => {
  if (!req.user) return res.status(401).json('Unauthorized');

  //for testing only -- determine time on client end, i think
  //so that "now" is dependent on user & not server timezone
  const now = new Date();

  const user = req.user;
  const results = await LogsDB.findLog(user.user_id, now);

  res.status(200).json(results);
});

//all routes prepended by /users
router.get('/', getUsers);
router.get('/current', getCurrentUser);
router.get('/current/logs', getUsersLogs);
router.post('/current/logs', createLog);

module.exports = router;
