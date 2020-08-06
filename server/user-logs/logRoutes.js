const router = require('express-promise-router')();
const logHandlers = require('./logHandlers');

//all routes prepended by /user/logs
router.get('/', logHandlers.getAllLogs);
router.post('/', logHandlers.createLog);
router.get('/:date', logHandlers.getLog);
router.patch('/:date', logHandlers.updateLog);

module.exports = router;
