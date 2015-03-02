app.service('RequestService', ['$http', 'SessionService', function ($http, SessionService) {

    // users/nick_valid_registration
    // users/email_valid_registration
    // users/register
    // users/login
    // users/logout

    /**
     * usage:
     * RequestService.create('users/login', credentials, callbackFkt, errorFkt)
     */
    this.post = function(action, data, callback, errorCallback){
        var user = {
            nick: SessionService.nick,
            token: SessionService.token
        };

        return $http
            .post('http://localhost:3000/api/v1/' + action + '.json', { user: user, data: data })
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

    this.get = function(action, data, callback, errorCallback){

        return $http
            .get('http://localhost:3000/api/v1/' + action + '.json', { params: data })
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