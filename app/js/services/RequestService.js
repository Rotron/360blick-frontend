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
        return $http
            .post('http://localhost:3000/api/v1/' + action + '.json', data)
            .success(function(res){
                callback(res);
            })
            .error(function(res){
               errorCallback(res);
            });
    };

}]);