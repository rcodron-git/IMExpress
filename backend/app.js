// Express.js app configuration
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(express.json());
app.use(cors());

// Environment variable validation
['CLIENT_ID', 'CLIENT_SECRET', 'AUTH_URL'].forEach((key) => {
  if (!process.env[key]) {
    console.error(`Environment variable ${key} is not set.`);
    process.exit(1);
  }
});

// Add security headers
const helmet = require('helmet');
app.use(helmet());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to authenticate with a third-party API
app.post('/api/auth', async (req, res) => {
  try {
    const data = new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'write read',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    });
    const response = await axios.post(process.env.AUTH_URL, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Axios',
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Host': 'api.ingrammicro.com',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Length': data.toString().length
      }
    });
    console.log('Token:', response.data.access_token);
    const token = response.data.access_token;
    res.json({ token });
  } catch (error) {
    if (error.response) {
      console.error('Response Error:', error.response.data);
      res.status(error.response.status).json({ error: 'Authentication failed', details: error.response.data });
    } else if (error.request) {
      console.error('Request Error:', error.request);
      res.status(500).json({ error: 'No response received from the third-party API.' });
    } else {
      console.error('Unexpected Error:', error.message);
      res.status(500).json({ error: 'Authentication failed', details: error.message });
    }
  }
});

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Add a route to serve the landing page
app.get('/landing', (req, res) => {
  res.render('landing', { appName: 'IMExpress' });
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
