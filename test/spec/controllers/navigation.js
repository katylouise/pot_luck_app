'use strict';

describe('Controller: NavigationController', function () {

  var location, scope;

  beforeEach(module('swFrontApp'));

  beforeEach(inject(function($controller, $rootScope, $location){
    location = $location;
    scope = $rootScope.$new();
    $controller('NavigationController', { $scope: scope })
  }));

  describe('isActive', function() {
    it('returns true when paths are the same', function() {
      location.path('/test');
      expect(scope.isActive('/test')).toBeTruthy();
    });
  });

});
