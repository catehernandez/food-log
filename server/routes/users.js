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

const getCurrentUser = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(null);
  }
};

//all routes prepended by /users
router.get('/', getUsers);
router.get('/current', getCurrentUser);

module.exports = router;
