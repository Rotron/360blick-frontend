app.service('RequestService', ['$http', 'ENV_CONFIG', 'SessionService', 'ResponseErrorService', '$rootScope', function ($http, ENV_CONFIG, SessionService, ResponseErrorService, $rootScope) {
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
     * getPostFields
     * e.g. getPostFields()
     *
     * @return {Object}
     */
    function getPostFields (data) {
        return {
            user: getCredentialsObject(),
            data: data
        };
    }
    /**
     * RequestService.getFullActionUrl
     * e.g. RequestService.getFullActionUrl('users/login')
     *
     * @param {String} action e.g. 'users/login'
     *
     * @return {String}
     */
    function getFullActionUrl (action) {
        return ENV_CONFIG.api + '/' + action + '.json';
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
        errorCallback = typeof errorCallback !== 'undefined' ? errorCallback : function(error) { console.log(error); };
        return $http
            .post(getFullActionUrl(action), getPostFields(data))
            .success(function(res) {
                callback(res);
            })
            .error(function(res, status) {
                errorCallback(data);
                ResponseErrorService.handle(res, status);
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
        errorCallback = typeof errorCallback !== 'undefined' ? errorCallback : function(error) { console.log(error); };
        return $http
            .get(getFullActionUrl(action), { params: data })
            .success(function(res){
                callback(res);
            })
            .error(function(res){
                errorCallback(res);
                ResponseErrorService.handle(data, status);
            });
    };
    /**
     * formDataAppender
     * e.g. formDataAppender(formData, val, key)
     *
     * Helper Function for module ng-file-upload
     *
     * TODO: Refactor to Recursive
     */
    function formDataAppender (formData, val, key) {
        if (angular.isObject(val)) {
            angular.forEach(val, function(val_in, key_in) {
                if(angular.isObject(val_in)) {
                    angular.forEach(val_in, function(val_in_in, key_in_in) {
                        formData.append(key + '[' + key_in + '][' + key_in_in + ']', val_in_in);
                    });
                } else {
                    formData.append(key + '[' + key_in + ']', val_in);
                }
            });
        } else {
            formData.append(key, val);
        }
    }
    /**
     * getUploadConfig
     * e.g. getUploadConfig(data)
     *
     */
    function getUploadConfig(data, settings) {
        return {
            options: {
                url: getFullActionUrl(settings.apiEndPoint),
                paramName: settings.paramName,
                maxFiles: settings.maxFiles,
                acceptedFiles: ".png,.jpg"
            },
            eventHandlers: {
                sending: function (file, xhr, formData) {
                    var fields = getPostFields(data);
                    angular.forEach(fields, function(val, key) {
                        formDataAppender(formData, val, key);
                    });
                },
                success: function (file, res) {
                    $rootScope.$broadcast(settings.broadcastDomain, res.data);
                }
            }
        };
    }
    /**
     * RequestService.upload
     * e.g. RequestService.upload(scope, element)
     *
     */
    this.upload = function(scope, element) {
        var config = getUploadConfig(scope.uploadData, scope.uploadSettings);
        var dropzone = new Dropzone(element[0], config.options);

        angular.forEach(config.eventHandlers, function (handler, event) {
            dropzone.on(event, handler);
        });
    };

}]);