/** Routes each individual router into main app */
const user = require('./user');
const auth = require('./auth');
const log = require('./log');

module.exports = (app) => {
  app.use('/user', user);
  app.use('/auth', auth);
  app.use('/log', log);
};
