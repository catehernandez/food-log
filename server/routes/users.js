const router = require('express-promise-router')();

const db = require('../db');

/* testing */
const getUsers = (req, res) => {
  db.query('SELECT * FROM users')
    .then((results) => {
      res.status(200).json(results.rows);
    })
    .catch((err) => {
      throw err;
    });
};

//all routes prepended by /users
router.get('/', getUsers);

module.exports = router;
