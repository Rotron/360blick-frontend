'use strict';

app.controller('UserSettingsController', ['$scope', '$stateParams', 'RequestService', '$rootScope', function ($scope, $stateParams, RequestService, $rootScope) {
    $scope.username = $stateParams.username;

    $scope.uploadOptions = {
        broadcastDomain: 'updatedUserImage',
        apiEndPoint: 'users/update',
        paramName: 'data[asset][file]',
        uploadData: {},
        modalHeader: 'New Preview Image'
    };

    $rootScope.$on('updatedUserImage', function(event, data) {
        console.log('new project image:', data);
        $scope.user.profile_image = data.profile_image;
    });

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
