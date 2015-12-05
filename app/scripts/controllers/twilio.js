'use strict';

angular.module('swFrontApp')
  .controller('twilioController', function ($scope, $http) {
    // get the capability token from the server
    $http.get('/twilio/token').success(function(token) {
      Twilio.Device.setup(token);
      });
  });
