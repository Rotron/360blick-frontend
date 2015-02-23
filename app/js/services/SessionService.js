app.service('SessionService', ['USER_ROLES', function (USER_ROLES) {

    this.token = null;
    this.nick = null;
    this.email = null;
    this.userRole = USER_ROLES.guest;

    this.create = function (token, nick, email, userRole) {
        this.token = token;
        this.nick = nick;
        this.email = email;
        this.userRole = userRole;
    };

    this.destroy = function () {
        this.token = null;
        this.nick = null;
        this.email = null;
        this.userRole = USER_ROLES.guest;
    };

    return this;
}]);