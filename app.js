var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
var appRouter = require('./app_server/routes/index');

// view engine setup
app.set('views', path.join(__dirname, '/app_server/views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(500);
});

app.listen(80);
