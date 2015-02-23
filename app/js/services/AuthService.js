app.service('AuthService', ['RequestService', 'SessionService', '$rootScope', 'AUTH_EVENTS', 'btfModal',
    function (RequestService, SessionService, $rootScope, AUTH_EVENTS, btfModal) {

    this.showDialog = function () {

        var modal = btfModal({
            controller: 'LoginController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/login.html'
            //template: '<div class="btf-modal">Hello {{ctrl.name}}</div>'

        });

        modal.activate();

        /*var modal = btfModal({
            controller: function () {
                this.name = 'World';
            },
            controllerAs: 'ctrl',
            template: '<div class="btf-modal">Hello {{ctrl.name}}</div>'
        });

        modal.activate();*/
    };

    $rootScope.$on(AUTH_EVENTS.notAuthenticated, this.showDialog);
    $rootScope.$on(AUTH_EVENTS.sessionTimeout, this.showDialog);

    this.login = function (credentials) {

        RequestService.create('users/login', credentials, function(res){
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            console.log(res);
            $rootScope.setCurrentUser(credentials);
            // TODO: Backend, res.data.role
            SessionService.create(res.auth_token, res.nick, res.email, 'editor');
        },
        function(){
            console.log('login faild');
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
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