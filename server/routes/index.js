/** Routes each individual router into main app */
const users = require('./users');
const auth = require('./auth');
const log = require('./log');

module.exports = (app) => {
  app.use('/users', users);
  app.use('/auth', auth);
  app.use('/log', log);
};
