'use strict';

app.controller('LoginController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {

    $scope.credencials = {};

    $scope.close = function(val){

    };

    $scope.login = function (credencials) {
        AuthService.login(credencials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//            $scope.setCurrentUser(user);
            console.log(user);
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
}]);
