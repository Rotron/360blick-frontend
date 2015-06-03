'use strict';

app.controller('ProjectAssetsSettingsController', ['$scope', '$stateParams', 'RequestService', '$rootScope', 'ENV_CONFIG', 'ModalService', function ($scope, $stateParams, RequestService, $rootScope, ENV_CONFIG, ModalService) {

    RequestService.post('projects/assets/specific', {asset_id: $stateParams.assetId}, function(res) {        
          $scope.assetTitle = res.data.title;
          $scope.assetImage = ENV_CONFIG.assets + res.data.file.file.url
        }, function(error) {
            console.log(error);
        }
    );

    $scope.uploadOptions = {
        broadcastDomain: 'updatedAssetImage',
        apiEndPoint: 'projects/assets/update',
        paramName: 'data[file]',
        uploadData: {id: $stateParams.assetId},
        modalHeader: 'New Asset Image',
        maxFiles: 1
    };

    $rootScope.$on('updatedAssetImage', function(event, data) {
        $scope.assetImage = ENV_CONFIG.assets + data.file.url
    });

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
