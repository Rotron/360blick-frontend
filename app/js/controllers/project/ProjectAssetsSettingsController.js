'use strict';

app.controller('ProjectAssetsSettingsController', ['$scope', '$stateParams', 'RequestService', '$rootScope', 'ENV_CONFIG', 'ModalService', function ($scope, $stateParams, RequestService, $rootScope, ENV_CONFIG, ModalService) {

    RequestService.post('projects/assets/specific', {asset_id: $stateParams.assetId}, function(res) {
          $scope.assetTitle = res.data.title;
        }, function(error) {
            console.log(error);
        }
    );

    $scope.updateAsset = function($event) {
        $event.stopPropagation();

        RequestService.post('projects/assets/update', {id: $stateParams.assetId, title: $scope.assetTitle}, function(res) {
                $scope.assetTitle = res.data.title;
                ModalService.openModal('info', {title: 'Success', message: 'Successfully updated.'});
            }, function(error) {
                console.log(error);
            }
        );
    };

}]);
