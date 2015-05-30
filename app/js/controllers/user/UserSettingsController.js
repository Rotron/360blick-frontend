'use strict';

app.controller('UserSettingsController', ['$scope', '$stateParams', 'RequestService', function ($scope, $stateParams, RequestService) {
    $scope.username = $stateParams.username;

    // Get user settings
    RequestService.post('users/get_data', {}, function(res) {   

            $scope.user = res.data;

        }, function(error) {
          console.log(error);
        }
    );

    $scope.updateUserSettings = function($event) {

    };
}]);
