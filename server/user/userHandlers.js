const validator = require('validator');

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
    if (!req.user) return res.sendStatus(401);

    //user is authenticated
    try {
      const user = req.user;
      const logs = await LogsDB.getAllUserLogs(user.user_id);

      //e.g. no logs found
      if (logs.length === 0) return res.sendStatus(404);

      res.status(200).json(logs);
    } catch {
      res.status(500).json(err);
    }
  },
  createLog: async (req, res) => {
    if (!req.user) return res.sendStatus(401);

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
    if (!req.user) return res.sendStatus(401);

    //user is authenticated
    try {
      const { user_id } = req.user;
      const { date } = req.params;

      //console.log(date);
      const log = await LogsDB.findLog(user_id, date);

      //if not log is found
      if (!log) return res.sendStatus(404);

      res.status(200).json(log);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateLog: async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    //user is authenticated
    try {
      const { user_id } = req.user;
      const { date } = req.params;
      const log = await LogsDB.findLog(user_id, date);

      if (!log) return res.sendStatus(404);

      //Only accept requests to patch one field at a time
      if (Object.keys(req.body).length !== 1)
        return res.status(400).json('Update exactly one log field at a time');

      //Only allowed to update some log fields e.g. cannot change user_id or log_date
      const modifiable = new Set([
        'veg_count',
        'fruit_count',
        'protein_count',
        'grain_count',
      ]);
      const key = Object.keys(req.body)[0];

      if (!modifiable.has(key))
        return res.status(400).send(`Cannot update field ${key}`);

      //Validate input
      if (!validator.isInt(req.body[key])) return res.sendStatus(400);

      //Finally ready to make request to db
      //LogsDB.updateLog(user_id, date, req.body);

      res.sendStatus(200);
    } catch (err) {
      res.status(422).json(err);
    }
  },
};
