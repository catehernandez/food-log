const router = require('express-promise-router')();
const userHandlers = require('./userHandlers');

//all routes for authenticated user prepended by /user
router.get('/', userHandlers.getCurrentUser);
router.post('/:id', userHandlers.updateUser);

module.exports = router;
