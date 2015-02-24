app.service('EventService', ['RequestService', '$rootScope', 'AUTH_EVENTS', 'btfModal', '$state',
    function (RequestService, $rootScope, AUTH_EVENTS, btfModal, $state) {

        var loginModal = btfModal({
            controller: 'LoginController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/login.html'
        });

        this.redirect = function () {
            $state.go($rootScope.nextState.next.name, $rootScope.nextState.params, {reload: true});
        };

        this.redirectLandingPage = function() {
            $state.go('app');
        };

        this.saveNextState = function(next){
            $rootScope.nextState = next;
        };

        this.handleAuthorization = function(data){
            this.saveNextState(data);
            loginModal.activate();
        };

        var that = this;
        $rootScope.$on(AUTH_EVENTS.notAuthenticated,  function(event,data){
            that.handleAuthorization(data);
        });
        $rootScope.$on(AUTH_EVENTS.notAuthorized, function(event,data){
            that.handleAuthorization(data);
        });
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {
            loginModal.activate();
        });
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
            loginModal.deactivate(); // TODO: remove dom
            that.redirect();
        });
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, this.redirectLandingPage);
    }]);