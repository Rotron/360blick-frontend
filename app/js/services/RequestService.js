app.service('RequestService', ['$http', '$upload', 'SessionService', function ($http, $upload, SessionService) {

    /**
     * getCredentialsObject
     * e.g. getCredentialsObject()
     *
     * @return {Object}
     */
    function getCredentialsObject() {
        return {
            nick: SessionService.nick,
            token: SessionService.token
        };
    }
    /**
     * getFullActionUrl
     * e.g. getFullActionUrl()
     *
     * @param {String} action e.g. 'users/login'
     *
     * @return {String}
     */
    function getFullActionUrl(action) {
        // TODO: Cleanup ENV
        var url = 'http://localhost:3000/api/v1';
        // @if NODE_ENV = 'PRODUCTION'
        url = 'https://blick.herokuapp.com/api/v1';
        // @endif

        return url + '/' + action + '.json';
    }
    /**
     * getFullActionUrl
     * e.g. getFullActionUrl()
     *
     * Helper Function for module ng-file-upload
     *
     * TODO: Refactor to Recursive
     */
    function formDataAppender(fd, key, val) {
        if (angular.isObject(val)) {
            angular.forEach(val, function(val_in, key_in) {
                if(angular.isObject(val_in)) {
                    angular.forEach(val_in, function(val_in_in, key_in_in) {
                        fd.append(key + '[' + key_in + '][' + key_in_in + ']', val_in_in);
                    });
                } else {
                    fd.append(key + '[' + key_in + ']', val_in);
                }
            });
        } else {
            fd.append(key, val);
        }
    }
    /**
     * RequestService.post
     * e.g. RequestService.post('users/login', {field: 'content'}, function callback(){}, function errorCallback(){})
     *
     * @param action {String} e.g. 'users/login'
     * @param data {Object} e.g. {field: 'content'}
     * @param callback {Function}
     * @param errorCallback {Function}
     */
    this.post = function(action, data, callback, errorCallback) {

        return $http
            .post(getFullActionUrl(action), { user: getCredentialsObject(), data: data })
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
    /**
     * RequestService.get
     * e.g. RequestService.get('users/login', {field: 'content'}, function callback(){}, function errorCallback(){})
     *
     * NOTE: Auth is not supported with this function
     * It's barely used in this project
     *
     * @param action {String} e.g. 'users/login'
     * @param data {Object} e.g. {field: 'content'}
     * @param callback {Function}
     * @param errorCallback {Function}
     */
    this.get = function(action, data, callback, errorCallback) {

        return $http
            .get(getFullActionUrl(action), { params: data })
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
    /**
     * RequestService.upload
     * e.g. RequestService.upload('projects/assets/create', {field: 'content'}, function callback(){}, function errorCallback(){})
     *
     * @param action {String} e.g. 'projects/assets/create'
     * @param data {Object} e.g. {field: 'content'}
     * @param callback {Function}
     * @param errorCallback {Function}
     * @param progressCallback {Function} e.g. progressCallback(progressPercentage, evt)
     */
    this.upload = function(action, data, file, callback, errorCallback, progressCallback) {
        data = data || {};

        return $upload.upload({
            url: getFullActionUrl(action),
            method: 'post',
            fileFormDataName: 'data[asset][file]',
            formDataAppender: formDataAppender,
            fields: { user: getCredentialsObject(), data: data},
            file: file
        }).progress(function(event) {
            var progressPercentage = parseInt(100.0 * event.loaded / event.total);
            progressCallback(progressPercentage, event);
        }).success(function(res) {
            callback(res);
        }).error(function(res) {
            errorCallback(res);
        });
    };

}]);