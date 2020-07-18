const db = require('../db');
const LogsDB = require('../db/logs');

module.exports = {
  /* getUsers route for testing only*/
  getUsers: (req, res) => {
    db.query('SELECT * FROM users')
      .then((results) => {
        res.status(200).json(results.rows);
      })
      .catch((err) => {
        throw err;
      });
  },

  getCurrentUser: async (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json(null);
    }
  },

  getUsersLogs: async (req, res) => {
    if (!req.user) {
      res.status(401).json('Unauthorized');
    } else {
      const user = req.user;
      const results = await LogsDB.getAllUserLogs(user.user_id);

      res.status(200).json(results);
    }
  },

  createLog: async (req, res) => {
    if (!req.user) return res.status(401).json('Unauthorized');

    const user = req.user;
    const { date } = req.body;

    try {
      const newLog = await LogsDB.createLog(user.user_id, date);
      res.status(200).json(newLog);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getLog: async (req, res) => {
    if (!req.user) return res.status(401).json('Unauthorized');

    const { date } = req.params;

    const user = req.user;
    const log = await LogsDB.findLog(user.user_id, date);

    res.status(200).json(log);
  },
};
