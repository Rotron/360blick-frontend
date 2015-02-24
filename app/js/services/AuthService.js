app.service('AuthService', ['RequestService', 'SessionService', '$rootScope', 'AUTH_EVENTS',
    function (RequestService, SessionService, $rootScope, AUTH_EVENTS) {

    this.login = function (credentials) {
        RequestService.create('users/login', credentials, function(res){
            $rootScope.setCurrentUser(credentials);
            // TODO: Backend, res.data.role
            SessionService.create(res.auth_token, res.nick, res.email, 'editor');
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {nick: res.nick});
            },
        function(){
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };

    this.logout = function () {
        var credentials = {
            nick: SessionService.nick
        };

        RequestService.create('users/logout', credentials, function(res){
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                SessionService.destroy();
            },
            function(error){
                $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
            });
    };

    this.reloadLocalCredentials = function () {
        SessionService.reloadLocalCredentials();
    };

    this.isAuthenticated = function () {
        return !!SessionService.nick;
    };

    this.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }

        return (this.isAuthenticated() &&
        authorizedRoles.indexOf(SessionService.userRole) !== -1);
    };
}]);