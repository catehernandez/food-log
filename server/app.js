const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const compression = require('compression');
const helmet = require('helmet');
const numCPUs = require('os').cpus().length;
const path = require('path');
require('dotenv').config();
const rateLimit = require('express-rate-limit');

const pool = require('./db');
const mountRoutes = require('./routes');

//Authentication packages
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
require('./services/passport');

//configure rate limiter on login route
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests,
});

//configure rate limiter on signup route
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, //1 hour
  max: 5, //5 requests
});

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
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'lax' }, // 30 days
};

//Only serve cookies over HTTPS in production
if (process.env.NODE_ENV === 'production') {
  sess.cookie.secure = true; // serve secure cookies
  sess.cookie.httpOnly = true;
}

// from heroku-cra-node
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());
  app.use(helmet());

  //rate limiters
  app.use('/auth/login', loginLimiter);
  app.use('/auth/signup', signupLimiter);

  app.use(session(sess));
  app.use(passport.initialize());
  app.use(passport.session());

  /* Mount routes */
  mountRoutes(app);

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? 'dev server' : 'cluster worker ' + process.pid
      }: listening on port ${PORT}`
    );
  });
}
