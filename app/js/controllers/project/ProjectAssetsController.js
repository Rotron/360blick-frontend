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

        RequestService.post('projects/assets/get_from_project', {project: {id: projectId}}, function(res) {
                $scope.assets = res.data;
                console.log($scope.assets);
            }, function(error) {
                console.log(error);
            }
        );
    }

    getProjectAssets();

/*    $rootScope.$on('newAssetCreated', function(event, data){
        $scope.scenes.push(data);
    });*/

}]);
