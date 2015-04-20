'use strict';

app.controller('ProjectAssetsController', ['$scope', '$stateParams', 'ENV_CONFIG', 'RequestService', 'Asset', function ($scope, $stateParams, ENV_CONFIG, RequestService, Asset) {
    $scope.username = $stateParams.username;
    var projectId = $stateParams['projectId'];

    $scope.assets = [];

    function removeAssetFromArray(asset) {
        var index = $scope.assets.indexOf(asset);
        $scope.assets.splice(index, 1);
    }

    $scope.getAssetBackgroundImage = function getAssetBackgroundImage(asset) {
        return {
            'background-image': 'url(' + ENV_CONFIG.assets + asset.file.url + ')'
        };
    };

    $scope.deleteProjectAsset = function deleteAsset(asset) {
        RequestService.post('projects/assets/delete', {asset: {id: asset.id}}, function(res) {
                removeAssetFromArray(asset);
            }, function(error) {
                console.log(error);
            }
        );
    };

    function getProjectAssets() {
        $scope.assets = Asset.get(projectId, function(assets){
            $scope.assets = assets;
        });
    }

    getProjectAssets();

/*    $rootScope.$on('newAssetCreated', function(event, data){
        $scope.scenes.push(data);
    });*/

}]);
