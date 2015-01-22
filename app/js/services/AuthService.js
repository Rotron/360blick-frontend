app.service('AuthService',['ModalService', 'RequestService', '$http', 'SessionService', function(ModalService, RequestService, $http, SessionService) {

    this.showLoginModal = function(){
        ModalService.showModal({
            templateUrl: "views/partials/login.html",
            controller: "LoginController"
        });
    };

    this.nickValidRegistration = function(nick) {
        return $http
            .post('http://localhost:3000/api/v1/users/nick_valid_registration.json', {nick: nick})
            .then(function (res) {
                console.log(res);
            });
    };

    this.emailValidRegistration = function(email) {
        return $http
            .post('http://localhost:3000/api/v1/users/nick_valid_registration.json', {nick: email})
            .then(function (res) {
                console.log(res);
            });
    };

    this.register = function(credencials) {

        return $http
            .post('http://localhost:3000/api/v1/users/register.json', credencials)
            .then(function (res) {
                console.log(res);
            });
    };

    this.login = function(credencials){
        return $http
            .post('http://localhost:3000/api/v1/users/login.json', credencials)
            .success(function (res) {
                SessionService.create(res.auth_token, res.nick, res.email);
                return res.data;
            })
            .error(function(res, status){
                console.log('error');
                console.error(res);
            });
    };

    this.logout = function(credencials){
        return $http
            .post('http://localhost:3000/api/v1/users/logout.json', SessionService.getAuthCredentials() )
            .then(function (res) {
                console.log(res);
            });
    };

    this.isAuthenticated = function () {
        return !!SessionService.getNick();
    };

}]);