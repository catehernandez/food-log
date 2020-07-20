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

      //e.g. no logs found
      if (logs.length === 0) return res.status(404).json(null);

      res.status(200).json(logs);
    } catch {
      res.status(500).json(err);
    }
  },
  createLog: async (req, res) => {
    if (!req.user) return res.status(401).json('Unauthorized');

    //user is authenticated
    try {
      const { user_id } = req.user;
      const { date } = req.body;

      const newLog = await LogsDB.createLog(user_id, date);
      res.status(200).json(newLog);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getLog: async (req, res) => {
    if (!req.user) return res.status(401).json('Unauthorized');

    //user is authenticated
    try {
      const { user_id } = req.user;
      const { date } = req.params;

      console.log(date);
      const log = await LogsDB.findLog(user_id, date);

      //if not log is found
      if (!log) return res.status(404).json(null);

      res.status(200).json(log);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
