'use strict';

angular.module('swFrontApp')
  .controller('MainCtrl', function($scope, $http) {
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

  });
