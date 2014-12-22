'use strict';

app.controller('RegisterController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {

    $scope.credencials = {};

    $scope.close = function(val){

    };

    $scope.register = function (credencials) {
        AuthService.register(credencials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.registerSuccess);
            console.log(user);
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.registerFailed);
        });
    };
}]);
