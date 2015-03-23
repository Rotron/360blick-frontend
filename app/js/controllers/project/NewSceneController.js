'use strict';

app.controller('NewSceneController', ['$scope', 'RequestService', '$stateParams', '$rootScope', function ($scope, RequestService, $stateParams, $rootScope) {

    $scope.newScene = {
        title: null,
        description: null
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
                    $rootScope.$emit('newSceneCreated', res.data);
                }, function(error) {
                    console.log(error);
                }
            );
        }
    }
}]);
