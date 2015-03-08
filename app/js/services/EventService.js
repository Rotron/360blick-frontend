app.service('EventService', ['RequestService', '$rootScope', 'AUTH_EVENTS', 'btfModal', '$state',
    function (RequestService, $rootScope, AUTH_EVENTS, btfModal, $state) {

        var loginModal = btfModal({
            controller: 'LoginController',
            controllerAs: 'ctrl',
            templateUrl: 'partials/login.html'
        });

        this.redirect = function (nick) {
            var redirectState = {
                name: 'user',
                params: {
                    username: nick
                }
            };
            if($rootScope.nextState){
                redirectState.name = $rootScope.nextState.next.name;
                redirectState.params = $rootScope.nextState.params;
            }
            $state.go(redirectState.name, redirectState.params, {reload: true});
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
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
            loginModal.deactivate();
            var nick = data ? data.nick : null;
            $rootScope.currentUser = nick;
            that.redirect(nick);
        });
        $rootScope.$on(AUTH_EVENTS.registerSuccess, function(event, data) {
            var nick = data ? data.nick : null;
            $rootScope.currentUser = nick;
            that.redirect(nick);
        });
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
            $rootScope.currentUser = '';
            that.redirectLandingPage();
        });
    }]);