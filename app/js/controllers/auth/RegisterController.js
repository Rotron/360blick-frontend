'use strict';

app.controller('RegisterController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'RequestService', function ($scope, $rootScope, AUTH_EVENTS, RequestService) {

    $scope.credentials = {};

    $scope.close = function (val) {

    };

    $scope.register = function (credentials) {
        RequestService.post('users/register', credentials, function(res){
            $rootScope.$broadcast(AUTH_EVENTS.registerSuccess);
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.registerFailed);
        });
    };
}]);
