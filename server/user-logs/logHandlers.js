const LogsDB = require('../db/logs');
const validator = require('validator');

module.exports = {
  getAllLogs: async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    //user is authenticated
    try {
      const user = req.user;
      const logs = await LogsDB.getAllUserLogs(user.user_id);

      //e.g. no logs found
      if (logs.length === 0) return res.sendStatus(404);

      res.status(200).json(logs);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserLogsByMonth: async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    const { user_id } = req.user;
    const { month, year } = req.params;

    //validate params
    if (!validator.isInt(month, { min: 1, max: 12 }))
      return res.status(400).json('Month must be an integer between 1-12');
    if (!validator.isInt(year))
      return res.status(400).json('Year must be an integer');

    try {
      const logs = await LogsDB.getUserLogsByMonth(user_id, month, year);

      res.status(200).json(logs);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createLog: async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    //user is authenticated
    try {
      const { user_id } = req.user;
      const { date } = req.body;

      if (!validator.isISO8601(date))
        return res.status(400).json('Date must be in ISO format');

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

      if (!validator.isISO8601(date))
        return res.status(400).json('Date must be in ISO format');

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

    const { user_id } = req.user;
    const { date } = req.params;

    if (!validator.isISO8601(date))
      return res.status(400).json('Date must be in ISO format');

    try {
      const log = await LogsDB.findLog(user_id, date);

      if (!log) return res.sendStatus(404);
    } catch (err) {
      res.sendStatus(500);
    }

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
    const field = Object.keys(req.body)[0];

    if (!modifiable.has(field))
      return res.status(400).send(`Unmodifiable Field: ${field}`);

    //Validate input
    if (!Number.isInteger(req.body[field]))
      return res.status(400).json(`${field} value must be an integer`);

    //Finally ready to make request to db
    try {
      const updatedLog = await LogsDB.updateLog(
        user_id,
        date,
        field,
        req.body[field]
      );

      res.status(200).send(updatedLog);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
