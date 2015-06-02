app.service('ResponseErrorService', ['SessionService', 'ModalService', '$rootScope', 'AUTH_EVENTS', '$state', function (SessionService, ModalService, $rootScope, AUTH_EVENTS, $state) {

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

    function paymentRequired(data) {
        data.okCallback = function() { $state.go('app'); console.log('pay'); };
        ModalService.openModal('error', data);
    }

    var errorActions = {
        402: paymentRequired,
        401: sessionExpired,
        default: unhandledError
    };

    var ignoredStates = [404];

    this.handle = function(res, status) {
        if(ignoredStates[status]) return;
        var action = errorActions[status] || errorActions.default;
        var data = res.description ? res : {};
        action(data);
    };

}]);