const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));

/* testing */
const getUsers = (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

app.get('/users', getUsers);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
