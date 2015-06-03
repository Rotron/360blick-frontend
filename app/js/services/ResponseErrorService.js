app.service('ResponseErrorService', ['SessionService', 'ModalService', '$rootScope', 'AUTH_EVENTS', '$state', function (SessionService, ModalService, $rootScope, AUTH_EVENTS, $state) {

    function unhandledError(data) {
        ModalService.openModal('error', data);
    }

    function sessionExpired(data) {
        SessionService.destroy();
        ModalService.openModal('login', data);
    }

    function paymentRequired(data) {
        data.okCallback = function() { $state.go('app'); };
        ModalService.openModal('error', data);
    }

    var errorActions = {
        402: paymentRequired,
        401: sessionExpired,
        default: unhandledError
    };

    var ignoredStates = [404];

    this.getResponseData = function(res) {
        if(res.description) return res;
        return res.error ? {description: res.error} : {};
    }

    this.handle = function(res, status) {
        if(ignoredStates[status]) return;
        var action = errorActions[status] || errorActions.default;
        action(this.getResponseData(res));
    };

}]);