'use strict';

app.controller('ProjectAssetsController', ['$scope', '$stateParams', 'RequestService', 'Asset', function ($scope, $stateParams, RequestService, Asset) {
    $scope.username = $stateParams.username;

    $scope.assets = [];

    $scope.getAssetBackgroundImage = function getAssetBackgroundImage(asset) {
        return {
            'background-image': 'url(' + asset.file.url + ')'
        };
    };

    function getProjectAssets() {
        var projectId = $stateParams['projectId'];

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
