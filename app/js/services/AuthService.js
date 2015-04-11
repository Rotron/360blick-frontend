app.service('AuthService', ['RequestService', 'SessionService', '$rootScope', 'AUTH_EVENTS',
    function (RequestService, SessionService, $rootScope, AUTH_EVENTS) {

    this.login = function (credentials) {
        RequestService.post('users/login', credentials, function(res){
                console.log(res);
            SessionService.create(res.token, res.nick, res.email, res.userRole);
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

        RequestService.post('users/logout', credentials, function(res){
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

        $rootScope.isAuthenticated = this.isAuthenticated;
        $rootScope.isAuthorized = this.isAuthorized;

}]);