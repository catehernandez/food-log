/** Routes each individual router into main app */
const user = require('./user');

module.exports = (app) => {
  app.use('/user', user);
};
