/** Routes each individual router into main app */
const user = require('../user/userRoutes');
const auth = require('../auth/authRoutes');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/user', user);
};
