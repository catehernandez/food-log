const LogsDB = require('../db/logs');

module.exports = {
  getCurrentUser: async (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      //user is not authenticated
      res.json(null);
    }
  },

  getAllLogs: async (req, res) => {
    if (!req.user) return res.status(401).json('Unauthorized');

    //user is authenticated
    try {
      const user = req.user;
      const logs = await LogsDB.getAllUserLogs(user.user_id);
      res.status(200).json(logs);
    } catch {
      res.status(500).json(err);
    }
  },

  createLog: async (req, res) => {
    if (!req.user) return res.status(401).json('Unauthorized');

    //user is authenticated
    try {
      const user = req.user;
      const { date } = req.body;

      const newLog = await LogsDB.createLog(user.user_id, date);
      res.status(200).json(newLog);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getLog: async (req, res) => {
    if (!req.user) return res.status(401).json('Unauthorized');

    //user is authenticated
    try {
      const { date } = req.params;
      const { user_id } = req.user;

      const log = await LogsDB.findLog(user_id, date);

      res.status(200).json(log);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
