'use strict';

var gzippo = require('gzippo');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var morgan = require('morgan');
var appPort = process.env.PORT || 5000;

var accountSID = ''; //these are my sid and auth token (Bex)
var authToken = '';
//var appSid = "APd0c95b98dbdf101aa8fa8be315e1e683";

server.listen(appPort, function() {
  console.log("App server started and listening at:", appPort);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));


var client = require('twilio')(accountSID, authToken);

app.post('/sendsms/party', function(req, res, error) {
  for (var i = 0; i < req.body.length; i++) {
    client.messages.create({
      to: req.body[i].phone,
      from: "+441915801579",
      body: "We are winning - please can we go to bed now lewis!",
    }, function(err, message) {
      console.log(message.sid);
    });
  }
  res.end();
});
