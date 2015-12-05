'use strict';

var gzippo = require('gzippo');
var express = require('express');
var app = express();
var morgan = require('morgan');
var twilio = require('twilio');
var appPort = process.env.PORT || 5000;

var accountSID = 'AC3dc935f68825d2ac5df7a3d874331784';
var authToken = 'e91eec8358b643b6e16fa52e77b78b0d';
var appSid = "APd0c95b98dbdf101aa8fa8be315e1e683";
// var
app.get("/twilio/token", function(req, res) {
  var capability = new twilio.Capability (accountSID, authToken);
  capability.allowClientOutgoing(appSid);

  res.send(capability.generate());

});



app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(appPort, function() {
  console.log("App server started and listening at:", appPort);
});
