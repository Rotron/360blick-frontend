'use strict';

app.controller('RegisterController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'RequestService', 'SessionService', function ($scope, $rootScope, AUTH_EVENTS, RequestService, SessionService) {

    $scope.credentials = {};

    $scope.close = function (val) {

    };

    $scope.register = function (credentials) {
        RequestService.post('users/register', credentials, function(res){
            SessionService.create(res.token, res.nick, res.email, 'editor');
            $rootScope.$broadcast(AUTH_EVENTS.registerSuccess, {nick: res.nick});
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.registerFailed);
        });
    };
}]);
