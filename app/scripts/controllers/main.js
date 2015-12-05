'use strict';

angular.module('swFrontApp')
  .controller('MainCtrl', function($scope, $http) {
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
        // var point = new Point(0,51.5);
        // var symbol = new SimpleMarkerSymbol().setColor("#1036DE").setSize(14);
        // var graphic = new Graphic(point, symbol);
        // var infoTemplate = new InfoTemplate();
        // locationLayer.add(graphic);
        // graphic.setInfoTemplate(infoTemplate);
        // map.addLayer(locationLayer);  // Makes sure that map is loaded


    function drawOnMap(array){
          for(var i=0; i<array.length; i++){
            var longitude = array[i].coords[1];
            var latitude = array[i].coords[0];
            var point = new Point(longitude, latitude);
            var symbol = new SimpleMarkerSymbol().setColor("#1036DE").setSize(14);
            var graphic = new Graphic(point, symbol);
            locationLayer.add(graphic);
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

    $scope.addIngredientsAndShopToList = function(shop) {
      $scope.ingredients.push({ "ingredient": $scope.ingredientSearchTerm, "shop": shop });
      $scope.shops = [];
    }

  }
})
