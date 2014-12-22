app.service('SessionService', function () {

    this.getSession = function() {
        return {
            id: this.id,
            userId: this.userId,
            userNick: this.userNick,
            userEmail: this.userEmail,
            userRole: this.userRole
        }
    };

    this.create = function (sessionId, userId, userNick, userEmail, userRole) {
        this.id = sessionId;
        this.userId = userId;
        this.userNick = userNick;
        this.userEmail = userEmail;
        this.userRole = userRole;
    };
    this.destroy = function () {
        this.id = null;
        this.userId = null;
        this.userNick = null;
        this.userEmail = null;
        this.userEmail = null;
        this.userRole = null;
    };
    return this;
})