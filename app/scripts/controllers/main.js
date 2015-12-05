'use strict';

angular.module('swFrontApp')
  .config(function(TwilioProvider) {
    // var accountSID = 'AC98d3efd00c4a9a7bbb98fc8f86d2308a';
    // var authToken = '7872f37eb4c6ff5b8dd181d98f99a4ba';
     TwilioProvider.setCredentials({
         accountSid: 'AC98d3efd00c4a9a7bbb98fc8f86d2308a',
         authToken: '7872f37eb4c6ff5b8dd181d98f99a4ba'
     });
   })
  .controller('MainCtrl', function($scope, $http, Twilio) {
    $scope.partyGuests = [];
    $scope.ingredients = [];

    var people;
    var shops;
    var shopsArr;

    $scope.findPerson = function() {
      people = $http({method: 'GET', url: '/data/people.json'});
      people.then(function(success) {
        $scope.people = success.data.filter(function(person) {
          return person.name.toLowerCase() === $scope.friendSearchTerm.toLowerCase();
        });
      });
    }

    $scope.addPersonToList = function(person) {
      $scope.partyGuests.push(person);
      $scope.people = [];
    }

    $scope.findShop = function() {
      shops = $http({method: 'GET', url: '/data/shops.json'});
      shops.then(function(success) {
        $scope.shops = success.data.filter(function(shop) {
          return shop.items.indexOf($scope.ingredientSearchTerm) > -1;
        });
        if ($scope.shops.length === 0) {
          $scope.shops = [{ "name" : "Not in database - find it yourself!"}];
        }
      });
    }

    $scope.addIngredientsAndShopToList = function(shop) {
      $scope.ingredients.push({ "ingredient": $scope.ingredientSearchTerm, "shop": shop });
      $scope.shops = [];
    }
    $scope.sendSms = function() {
      Twilio.create('Messages', {
        to:   '+447496548640', // Any number Twilio can deliver to
        from: '+441702680429', // A number you bought from Twilio and can use for outbound communication
        body: 'You need to buy...' // body of the SMS message
      })
      .success(function(data, status, headers, config) {
        console.log("SUCCESS SMS SENT");
      })
      .error(function(data, status, headers, config) {
        console.log("ERROR SMS NOT SENT");
      });
    };
});
    // $scope.sendSms = function() {
    //   console.log("Do i get here?");
    //   var ourdata = { 'phone': 'hello' };
    //   $http.post('/sendsms/party', ourdata ).
    //     then(function() { console.log("posted");}), function() {
    //       console.log("didnt go through")
    //     });
      // .then(successCallback, errorCallback);
    // };
