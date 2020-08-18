const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const rateLimit = require('express-rate-limit');

//Authentication packages
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
require('./services/passport');

const pool = require('./db');
const mountRoutes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(helmet());

//configure rate limiter on login route
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests,
});

app.use('/auth/login', loginLimiter);

//configure rate limiter on signup route
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, //1 hour
  max: 5, //5 requests
});

app.use('/auth/signup', signupLimiter);

/* Authentication tools */
// Express session configuration object
const sess = {
  name: 'session',
  store: new pgSession({
    pool: pool, // Connection pool
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'strict' }, // 30 days
};

//Only serve cookies over HTTPS in production
if (process.env.NODE_ENV === 'production') {
  sess.cookie.secure = true; // serve secure cookies
  sess.cookie.httpOnly = true;
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

/* Mount routes */
mountRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
