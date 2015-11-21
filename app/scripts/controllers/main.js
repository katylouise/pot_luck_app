'use strict';

/**
 * @ngdoc function
 * @name swFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the swFrontApp
 */
angular.module('swFrontApp')
  .controller('MainCtrl', function ($resource) {
    $resource('/api/edges').query();
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
