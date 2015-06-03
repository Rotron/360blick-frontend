'use strict';

app.controller('LandingpageController', ['$scope', 'AuthService', function ($scope, AuthService) {
    $scope.logout = function($event) {
        $event.stopPropagation();
        AuthService.logout();
    };
}]);

