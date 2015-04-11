'use strict';

app.controller('ProjectAssetsController', ['$scope', '$stateParams', 'RequestService', function ($scope, $stateParams, RequestService) {
    $scope.username = $stateParams.username;

    function getAllProjectAssets(){
        RequestService.post('projects/assets/get_from_project', {project: {id: $stateParams['projectId']}}, function(res) {
                console.log(res.data);
                $scope.assets = res.data;
            }, function(error) {
                console.log(error);
            }
        );
    }

    getAllProjectAssets();

}]);
