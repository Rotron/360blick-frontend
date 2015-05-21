'use strict';

app.controller('ProjectScenesController', ['$scope', '$stateParams', 'RequestService', '$rootScope', function ($scope, $stateParams, RequestService, $rootScope) {
    $scope.username = $stateParams.username;
    $scope.projectId = $stateParams.projectId;

    $scope.scenes = [];

    function getAllScenes() {
        RequestService.post('scenes/get_scenes', {project: {id: $stateParams['projectId']}}, function(res) {
                $scope.scenes = res.data;
            }, function(error) {
                console.log(error);
            }
        );
    }

    getAllScenes();

    $rootScope.$on('newSceneCreated', function(event, data){
        $scope.scenes.push(data);
    });
}]);
