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

router.get('/users', getUsers);

module.exports = router;