const express = require('express');
const bodyParser = require('body-parser');

const mountRoutes = require('./routes');

const app = express();
mountRoutes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
