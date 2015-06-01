app.service('ResponseErrorService', ['SessionService', 'ModalService', '$rootScope', 'AUTH_EVENTS', function (SessionService, ModalService, $rootScope, AUTH_EVENTS) {


    /* $rootScope.$broadcast({
     401: AUTH_EVENTS.notAuthenticated,
     403: AUTH_EVENTS.notAuthorized,
     419: AUTH_EVENTS.sessionTimeout,
     440: AUTH_EVENTS.sessionTimeout
     */

    function okCallback() {
        console.log('ok clicked');
    }

    function unhandledError(data) {
        data.okCallback = okCallback;
        ModalService.openModal('error', data);
    }


    var errorActions = {
        400: unhandledError,
        401: unhandledError,
        default: unhandledError
    };

    this.handle = function(data, status) {
        if(data.error === undefined) return;
        var action = errorActions[status] || errorActions.default;
        action(data);
    };

}]);