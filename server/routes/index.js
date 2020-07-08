/** Routes each individual router into main app */
const user = require('./user');
const auth = require('./auth');
const dash = require('./dash');

module.exports = (app) => {
  app.use('/user', user);
  app.use('/auth', auth);
  app.use('/', dash);
};
