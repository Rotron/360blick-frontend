app.service('ResponseErrorService', ['SessionService', 'ModalService', '$rootScope', 'AUTH_EVENTS', '$state', function (SessionService, ModalService, $rootScope, AUTH_EVENTS, $state) {


    /* $rootScope.$broadcast({
     401: AUTH_EVENTS.notAuthenticated,
     403: AUTH_EVENTS.notAuthorized,
     419: AUTH_EVENTS.sessionTimeout,
     440: AUTH_EVENTS.sessionTimeout
     */

    function okCallback() {}

    function unhandledError(data) {
        data.okCallback = okCallback;
        ModalService.openModal('error', data);
    }

    function sessionExpired(data) {
        data.okCallback = okCallback;
        SessionService.destroy();
        ModalService.openModal('login', data);
    }

    var errorActions = {
        400: unhandledError,
        401: sessionExpired,
        default: unhandledError
    };

    var ignoredStates = [404];

    this.handle = function(res, status) {
        if(ignoredStates[status]) return;
        var action = errorActions[status] || errorActions.default;
        var data = res.description || res.error || {};
        action(data);
    };

}]);