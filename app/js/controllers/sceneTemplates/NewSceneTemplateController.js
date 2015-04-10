'use strict';

app.controller('NewSceneTemplateController', ['$scope', 'RequestService', '$rootScope', function ($scope, RequestService, $rootScope) {


    $scope.newScene = {
        title: null,
        description: null
    };

    $scope.createNewSceneTemplate = function(){
        var scene = {
            title: $scope.newSceneTemplate.title
        };

        if($scope.newSceneTemplate.title){
            RequestService.post('templatescenes/create', {scene: scene}, function(res) {
                    $rootScope.$emit('newSceneTemplateCreated', res.data);
                }, function(error) {
                    console.log(error);
                }
            );
        }
    }
}]);
