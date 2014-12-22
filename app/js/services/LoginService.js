app.service('Login',['ModalService', 'Request', '$http', 'Session', function(ModalService, RequestService, $http, Session) {


    this.showLoginModal = function(){
        ModalService.showModal({
            templateUrl: "views/partials/login.html",
            controller: "LoginCtrl"
        });
    };

    this.login = function(credentials){
        return $http
            .post('http://localhost:8000/users/sign_in', credentials)
            .then(function (res) {
                console.log(res);
//                Session.create(res.data.id, res.data.user.id,
//                    res.data.user.role);
//                return res.data.user;
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