'use strict';

app.controller('LoginController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'SessionService', 'AuthService', '$state', function ($scope, $rootScope, AUTH_EVENTS, SessionService, AuthService, $state) {

    var isLoginTemplate = $state.current.name == 'login';
    if(isLoginTemplate && AuthService.isAuthenticated()) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {nick: SessionService.nick});
    }

    $scope.credentials = {
        nick: '',
        password: ''
    };

    $scope.login = function (credentials) {

        AuthService.login(credentials);
    };
}]);
