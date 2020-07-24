const router = require('express-promise-router')();
const userHandlers = require('./userHandlers');

//all routes for authenticated user prepended by /user
router.get('/', userHandlers.getCurrentUser);
router.get('/logs', userHandlers.getAllLogs);
router.post('/logs', userHandlers.createLog);
router.get('/logs/:date', userHandlers.getLog);
router.patch('/logs/:date', userHandlers.updateLog);

module.exports = router;
