'use strict';

app.controller('UserSettingsController', ['$scope', 'SessionService', 'RequestService', '$rootScope', 'ENV_CONFIG', function ($scope, SessionService, RequestService, $rootScope, ENV_CONFIG) {

    $scope.user = {
        nick: SessionService.nick,
        email: SessionService.email,
        profileImage: ENV_CONFIG.assets + SessionService.profileImage
    };

    $scope.uploadOptions = {
        broadcastDomain: 'updatedUserImage',
        apiEndPoint: 'users/update',
        paramName: 'data[profile_image]',
        uploadData: {},
        modalHeader: 'New Profile Image',
        maxFiles: 1
    };

    $rootScope.$on('updatedUserImage', function(event, data) {
        $scope.user.profileImage = ENV_CONFIG.assets + data.profile_image;
    });

    $scope.updateUserSettings = function($event) {

    };
}]);
