'use strict';

app.controller('RegisterController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'RequestService', 'SessionService', '$state', function ($scope, $rootScope, AUTH_EVENTS, RequestService, SessionService, $state) {

    var isRegisterTemplate = $state.current.name == 'register';
    if(isRegisterTemplate && $rootScope.isAuthenticated()) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {nick: SessionService.nick});
    }

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
