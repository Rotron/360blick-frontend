'use strict';

app.controller('LoginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'Login', function ($scope, $rootScope, AUTH_EVENTS, LoginService) {

        $scope.credencials = {};

        $scope.close = function(val){

        }
    $scope.login = function (credentials) {
        LoginService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//            $scope.setCurrentUser(user);
            console.log(user);
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
}]);
