'use strict';

describe('Controller: LoginController', function () {

    beforeEach(module('360blickFrontendApp'));

    var LoginController, scope;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LoginController = $controller('LoginController', {
          $scope: scope
        });
    }));

    it('should have credentials object', function () {
        expect(scope.credentials).toEqual(jasmine.any(Object));
    });

    it('should have credentials object with nick parameter', function () {
        expect(scope.credentials.nick).toEqual(jasmine.any(String));
    });

    it('should have credentials object with password parameter', function () {
        expect(scope.credentials.password).toEqual(jasmine.any(String));
    });

});
