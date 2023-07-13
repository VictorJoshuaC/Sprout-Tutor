const session = require('express-session');

const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  },
});

module.exports = sessionMiddleware;
