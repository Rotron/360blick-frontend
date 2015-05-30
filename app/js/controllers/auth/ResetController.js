'use strict';

app.controller('ResetController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'RequestService', '$location', function ($scope, $rootScope, AUTH_EVENTS, RequestService, $location) {

    $scope.credentials = {
        email: '',
        password: null
    };

    $scope.showResetForm = true;

    $scope.states = {
        reset: {
            showSuccessMessage: false,
            showErrorMessage: false,
            showPasswordInput: false,
            showEmailInput: true,
            showForm: true
        }
    };

    // TODO: go for two diffrent forms.... to reduce states
    // TODO: handle conflict on repeated request
    function resetPassword() {

        var data = {
            password: $scope.credentials.password,
            password_conf: $scope.credentials.password,
            reset_token: $location.search().token
        };

        RequestService.post('users/reset_pw', data, function(res) {
                console.log('success');
            },
            function(error) {
                console.log(error);
                $scope.states.reset.showErrorMessage = true;
            }
        );
    }

    if($location.search().token) {
        $scope.states.reset.showEmailInput = false;
        $scope.states.reset.showPasswordInput = true;
    }

    $scope.reset = function (credentials) {
        RequestService.post('users/send_reset_pw', credentials, function(res) {
                $scope.states.reset.showSuccessMessage = true;
                $scope.states.reset.showForm = false;
                $scope.states.reset.showErrorMessage = false;
            },
            function(error) {
                $scope.states.reset.showErrorMessage = true;
            }
        );
    };
}]);
