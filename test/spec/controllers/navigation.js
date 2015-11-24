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

    it('returns false when paths are not the same', function() {
      location.path('/differentPath');
      expect(scope.isActive('/test')).toBeFalsy();
    });

    it('returns true when paths start with the same word', function() {
      location.path('/test/about/something');
      expect(scope.isActive('/test')).toBeTruthy();
    });

    it('returns true when paths start with the same word and one is followed by a query string', function() {
      location.path('/test?id=1');
      expect(scope.isActive('/test')).toBeTruthy();
    });

  });

});
