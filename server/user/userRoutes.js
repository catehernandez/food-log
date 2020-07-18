const router = require('express-promise-router')();
const userHandlers = require('./userHandlers');

//all routes prepended by /users
router.get('/', userHandlers.getUsers);
router.get('/current', userHandlers.getCurrentUser);
router.get('/current/logs', userHandlers.getUsersLogs);
router.post('/current/logs', userHandlers.createLog);
router.get('/current/logs/:date', userHandlers.getLog);

module.exports = router;
