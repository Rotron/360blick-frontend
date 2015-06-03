'use strict';

app.controller('UserSettingsController', ['$scope', 'SessionService', 'RequestService', '$rootScope', 'ENV_CONFIG', 'ModalService', function ($scope, SessionService, RequestService, $rootScope, ENV_CONFIG, ModalService) {

    $scope.user = {
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
        $event.stopPropagation();

        RequestService.post('users/update', {email: $scope.user.email, old_password: $scope.user.old_password}, function(res) {
            SessionService.renewSession(res.data);
                $scope.user.email = res.data.email;
                $scope.user.old_password = "";
                ModalService.openModal('info', {title: 'Success', message: 'Successfully updated.'});
            }, function(error) {
                console.log(error);
            }
        );
    };
}]);
