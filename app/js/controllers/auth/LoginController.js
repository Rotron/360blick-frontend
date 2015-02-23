'use strict';

app.controller('LoginController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {

    $scope.credentials = {
        nick: '',
        password: ''
    };

    $scope.login = function (credentials) {

        AuthService.login(credentials);
    };
}]);
