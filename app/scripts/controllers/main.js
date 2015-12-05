'use strict';

angular.module('swFrontApp')
  .controller('MainCtrl', function($scope, $http) {
    var people;
    $scope.findPerson = function() {
      people = $http({method: 'GET', url: '/data/people.json'});
      people.then(function(success) {
        console.log(success.data);
        $scope.person = success.data;
      });
    }
  });
