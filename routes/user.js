const express = require('express');
const router = express.Router();

const db = require('../db');

/* testing */
const getUsers = (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

router.get('/users', getUsers);

module.exports = router;
