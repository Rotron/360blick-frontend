'use strict';

app.controller('ResetController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'RequestService', '$location', function ($scope, $rootScope, AUTH_EVENTS, RequestService, $location) {

    $scope.credentials = {
        email: '',
        password: null
    };

    $scope.states = {
        resetRequest: {
            showSuccessMessage: false,
            showErrorMessage: false,
            showForm: true
        },
        resetConfirm: {
            showSuccessMessage: false,
            showErrorMessage: false,
            showForm: false
        }
    };

    $scope.reset = function (credentials) {
        RequestService.post('users/send_reset_pw', credentials, function(res) {
                $scope.states.resetRequest.showForm = false;
                $scope.states.resetRequest.showSuccessMessage = true;
                $scope.states.resetRequest.showErrorMessage = false;
            },
            function(error) {
                $scope.states.resetRequest.showErrorMessage = true;
            }
        );
    };

    // TODO: handle conflict on repeated request
    $scope.confirm = function(credentials) {

        var data = {
            password: $scope.credentials.password,
            password_conf: $scope.credentials.password,
            reset_token: $location.search().token
        };

        RequestService.post('users/reset_pw', data, function(res) {
                $scope.states.resetConfirm.showForm = false;
                $scope.states.resetConfirm.showSuccessMessage = true;
                $scope.states.resetConfirm.showErrorMessage = false;
            },
            function(error) {
                console.log(error);
                $scope.states.resetConfirm.showErrorMessage = true;
            }
        );
    };

    $scope.redirectProfile = function() {
        console.log('redirect');
    };

    if($location.search().token) {
        $scope.states.resetRequest.showForm = false;
        $scope.states.resetConfirm.showForm = true;
    }

}]);
