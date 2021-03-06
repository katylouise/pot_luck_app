'use strict';

angular.module('swFrontApp')
  .controller('MainCtrl', function($scope, $http, Twilio) {
    $scope.partyGuests = [];
    $scope.ingredients = [];

    require([
      "esri/map",
      "esri/graphic",
      "esri/layers/GraphicsLayer",
      "esri/geometry/Point",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/InfoTemplate",
      "dojo/domReady!"
      ],
      everythingElse)

    function everythingElse(Map, Graphic, GraphicsLayer, Point, SimpleMarkerSymbol, InfoTemplate) {
        var map = new Map("map", {
          basemap: "gray",
          center: [0,51.5], // longitude, latitude
          zoom: 12
        });
        var locationLayer = new GraphicsLayer();
        // locationLayer.add(graphic);
        // graphic.setInfoTemplate(infoTemplate);
        // map.addLayer(locationLayer);  // Makes sure that map is loaded


    function drawOnMap(array){
          for(var i=0; i<array.length; i++){
            var longitude = array[i].coords[1];
            var latitude = array[i].coords[0];
            var point = new Point(longitude, latitude);
            var symbol = new SimpleMarkerSymbol().setColor("#1036DE").setSize(14);
            var infoTemplate = new InfoTemplate();
            infoTemplate.setTitle(array[i].name);
            infoTemplate.setContent(array[i].postcode);
            var graphic = new Graphic(point, symbol);
            locationLayer.add(graphic);
            graphic.setInfoTemplate(infoTemplate);
            console.log("I am working");
          }
          map.addLayer(locationLayer);
        }
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


    function drawShopOnMap(array, ingredient){
          for(var i=0; i<array.length; i++){
            var longitude = array[i].coords[1];
            var latitude = array[i].coords[0];
            var point = new Point(longitude, latitude);
            var symbol = new SimpleMarkerSymbol().setColor("#FE2E2E").setSize(14);
            var infoTemplate = new InfoTemplate();
            infoTemplate.setTitle(array[i].name);
            console.log(ingredient)
            infoTemplate.setContent(ingredient + ", " + array[i].postcode);
            var graphic = new Graphic(point, symbol);
            locationLayer.add(graphic);
            graphic.setInfoTemplate(infoTemplate);
          }
          map.addLayer(locationLayer);
        }
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
      drawOnMap($scope.partyGuests);
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

    $scope.selectedShops =[];

    $scope.addIngredientsAndShopToList = function(shop) {
      $scope.ingredients.push({ "ingredient": $scope.ingredientSearchTerm, "shop": shop });
      $scope.shops = [];
      $scope.selectedShops.push(shop);
      drawShopOnMap($scope.selectedShops, $scope.ingredientSearchTerm);
    }

    $scope.calculateDistance = function(coords1, coords2){
      var difflong = coords1[0] - coords2[0];
      var difflat = coords1[1] - coords2[1];
      var distance = Math.sqrt((difflong*difflong)+(difflat*difflat));
      return distance;
    }

    $scope.peopleShopsToCollect = []

    $scope.assignItems = function() {
      for(var i=0; i<$scope.selectedShops.length; i++){
        var distances = [];
        for(var j=0; j<$scope.partyGuests.length; j++){
          distances.push({"person": $scope.partyGuests[j].name, "phone" : $scope.partyGuests[j].phone, "index" : j, "distance":$scope.calculateDistance($scope.selectedShops[i].coords, $scope.partyGuests[j].coords), "shop" : $scope.selectedShops[i].name });
        }
        distances.sort(function(a, b) {
          return a.distance-b.distance
        })
       $scope.peopleShopsToCollect.push(distances[0]);
       console.log($scope.peopleShopsToCollect);
       $scope.partyGuests.splice(distances[0].index, 1)
      }
    }

    $scope.sendSms = function() {
      $http.post('/sendsms/party', $scope.partyGuests)
        .then(function successCallback(data) {
         console.log("posted");
        }, function errorCallback(data) {
          console.log("didnt go through");
        });
        angular.element('.message').show();
      }

    }
});
