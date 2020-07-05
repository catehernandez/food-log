const express = require('express');
const bodyParser = require('body-parser');

//Authentication packages
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const pool = require('./db');
const mountRoutes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session configuration object
const sess = {
  store: new pgSession({
    pool: pool, // Connection pool
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
};

//Only serve cookies over HTTPS in production but allow for testing in development
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

mountRoutes(app);

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
