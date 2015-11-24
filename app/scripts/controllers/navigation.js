'use strict';

angular.module('swFrontApp').controller('NavigationController', function($scope, $location) {
  $scope.isActive = function(path) {
    var currentPath = $location.path().split('')[1];
    return currentPath === path.split('')[1];
  };
});