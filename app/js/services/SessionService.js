app.service('SessionService', function () {

    this.getSession = function() {
        return {
            token: this.token,
            nick: this.nick,
            email: this.email
        }
    };

    this.getNick = function() {
        return this.nick;
    };

    this.getAuthCredentials = function() {
        return {
            token: this.token,
            nick: this.nick
        }
    };

    this.create = function (token, nick, email) {
        this.token = token;
        this.nick = nick;
        this.email = email;
    };

    this.destroy = function () {
        this.token = null;
        this.nick = null;
        this.email = null;
    };

    return this;
})