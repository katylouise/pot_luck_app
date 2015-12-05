'use strict';

var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var twilio = require('twilio');
var appPort = process.env.PORT || 5000;

var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(appPort, function() {
  console.log("App server started and listening at:", appPort);
});
