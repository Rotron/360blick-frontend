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
            .then(function (res) {
                console.log(res);
                res.data.user = {
                    id: '123123123',
                    nick: 'david',
                    email: 'email'
                };

                Session.create(res.data.token, res.data.user.id, res.data.user.nick, res.data.user.email, 'free');
                return res.data.user;
            });
    };

    this.logout = function(credencials){
        return $http
            .post('http://localhost:3000/api/v1/users/logout.json', { token: '1' })
            .then(function (res) {
                console.log(res);
            });
    };

    this.isAuthenticated = function () {
        return !!Session.userId;
    };

    this.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
    };


}]);