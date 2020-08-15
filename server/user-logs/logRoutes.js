const router = require('express-promise-router')();
const logHandlers = require('./logHandlers');

//all routes prepended by /user/logs
router.get('/:year/:month', logHandlers.getLogsByMonth);
router.get('/:date', logHandlers.getLog);
router.patch('/:date', logHandlers.updateLog);
router.get('/', logHandlers.getAllLogs);
router.post('/', logHandlers.createLog);

module.exports = router;
