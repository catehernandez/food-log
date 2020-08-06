/** Routes each individual router into main app */
const auth = require('../auth/authRoutes');
const logs = require('../user-logs/logRoutes');
const user = require('../user/userRoutes');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/user', user);
  app.use('/user/logs', logs);
};
