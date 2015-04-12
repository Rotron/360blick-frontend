'use strict';

app.controller('ProjectAssetsController', ['$scope', '$stateParams', 'RequestService', 'Asset', function ($scope, $stateParams, RequestService, Asset) {
    $scope.username = $stateParams.username;

    console.log('asset controller');

/*    function getProjectAssets() {
        RequestService.post('projects/assets/get_from_project', {project: {id: $stateParams['projectId']}}, function(res) {
                $scope.assets = res.data;
            }, function(error) {
                console.log(error);
            }
        );
    }

    getProjectAssets();*/

}]);
