'use strict';

app.controller('ProjectAssetsController', ['$scope', '$stateParams', 'ENV_CONFIG', 'RequestService', 'AssetStoreService', function ($scope, $stateParams, ENV_CONFIG, RequestService, AssetStoreService) {
    $scope.username = $stateParams.username;
    var projectId = $stateParams['projectId'];

    $scope.getAssetBackgroundImage = function getAssetBackgroundImage(asset) {
        return {
            'background-image': 'url(' + ENV_CONFIG.assets + asset.file.url + ')'
        };
    };

    $scope.deleteAsset = function(asset) {
        AssetStoreService.delete({assetId: asset.id}, asset);
    };

    $scope.assets = AssetStoreService.get({projectId: projectId});

}]);
