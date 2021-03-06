var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

const { PDFDocument, rgb} = require('pdf-lib');
const fetch = require("node-fetch");

const FormData  = require('form-data');
const axios = require('axios');
const fs = require("fs")

var indexRouter = require('./routes/index');
const e = require('express');


var app = express();

app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/generate', indexRouter);








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('paperdaz pdf generator');
});

// app.listen(process.env.PORT, function() {
//   console.log('🚀 lift off')
// })

module.exports = app;

