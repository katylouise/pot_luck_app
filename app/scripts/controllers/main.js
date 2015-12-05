'use strict';

angular.module('swFrontApp')
  .controller('MainCtrl', function($scope, $http) {
    var people;
    $scope.findPerson = function() {
      people = $http({method: 'GET', url: '/data/people.json'});
      people.then(function(success) {
        $scope.people = success.data.filter(function(person) {
          return person.name.toLowerCase() === $scope.friendSearchTerm.toLowerCase();
        });
      });
    }

  });
