'use strict';

var gzippo = require('gzippo');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var twilio = require('twilio');
var appPort = process.env.PORT || 5000;

var accountSID = 'AC98d3efd00c4a9a7bbb98fc8f86d2308a';
var authToken = '7872f37eb4c6ff5b8dd181d98f99a4ba';
var appSid = "APd0c95b98dbdf101aa8fa8be315e1e683";

// var twilioClient = twilio(accountSID, authToken);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(appPort, function() {
  console.log("App server started and listening at:", appPort);
});

app.post('/sendsms/party', function(req, res) {
//Send an SMS text message

console.log("REQUEST DATA", req.body);
// console.log(data);
  // twilioClient.sendMessage({
  //     to:   '+447496548640', // Any number Twilio can deliver to
  //     from: '+441702680429', // A number you bought from Twilio and can use for outbound communication
  //     body: 'You need to buy...' // body of the SMS message
  //
  // }, function(err, responseData) { //this function is executed when a response is received from Twilio
  //
  //     if (!err) { // "err" is an error received during the request, if any
  //         // "responseData" is a JavaScript object containing data received from Twilio.
  //         // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
  //         // http://www.twilio.com/docs/api/rest/sending-sms#example-1
  //         console.log(responseData.from); // outputs "+14506667788"
  //         console.log(responseData.body); // outputs "word to your mother."
  //     } else { throw err; }
  // });
});
