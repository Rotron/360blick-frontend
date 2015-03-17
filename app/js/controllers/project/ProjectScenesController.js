'use strict';

app.controller('ProjectScenesController', ['$scope', '$stateParams', 'RequestService', function ($scope, $stateParams, RequestService) {
    $scope.username = $stateParams.username;

    $scope.scenes = [];

    function getAllScenes(){
        RequestService.post('scenes/get_scenes', {project: {id: $stateParams['projectId']}}, function(res) {
                $scope.scenes = res.data;
            }, function(error) {
                console.log(error);
            }
        );
    }

    getAllScenes();

    $scope.newScene = {
        title: undefined
    };



    $scope.createNewScene = function(){

        var data = {
            project: {id: $stateParams['projectId']},
            scene: {
                title: $scope.newScene.title
            }
        };

        if($scope.newScene.title){
            RequestService.post('scenes/create', data, function(res) {
                    $scope.scenes.push(res.data);
                }, function(error) {
                    console.log(error);
                }
            );
        }
    }

}]);
