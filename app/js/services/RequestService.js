app.service('RequestService', ['$http', 'SessionService', function ($http, SessionService) {

    this.showLoginModal = function () {
        ModalService.showModal({
            templateUrl: "views/partials/login.html",
            controller: "LoginController"
        });
    };

    // users/nick_valid_registration
    // users/email_valid_registration
    // users/register
    // users/login
    // users/logout

    /**
     * usage:
     * RequestService.create('users/login', credentials, callbackFkt, errorFkt)
     */
    this.create = function(action, data, callback, errorCallback){
        data.token = SessionService.token;

        return $http
            .post('http://localhost:3000/api/v1/' + action + '.json', data)
            .success(function(res){
                callback(res);
            })
            .error(function(res){
               errorCallback(res);

                /* $rootScope.$broadcast({
                 401: AUTH_EVENTS.notAuthenticated,
                 403: AUTH_EVENTS.notAuthorized,
                 419: AUTH_EVENTS.sessionTimeout,
                 440: AUTH_EVENTS.sessionTimeout
                 */
            });
    };

}]);