const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require('./queries');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/users', db.getUsers);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
