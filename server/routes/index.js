/** Routes each individual router into main app */
const users = require('../user/userRoutes');
const auth = require('./auth');

module.exports = (app) => {
  app.use('/users', users);
  app.use('/auth', auth);
};
