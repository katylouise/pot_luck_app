'use strict';

angular.module('swFrontApp').directive('main', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  }
});