'use strict';

app.controller('SceneTemplatesController', ['$scope', '$rootScope', '$stateParams', 'RequestService', function ($scope, $rootScope, $stateParams, RequestService) {
    $scope.username = $stateParams.username;

    $scope.sceneTemplates = [];

    function getAllTemplates() {
        RequestService.post('templatescenes/all', {}, function (res) {
                $scope.sceneTemplates = res.data;
            }, function (error) {
                console.log(error);
            }
        );
    }

    getAllTemplates();

    $scope.deleteTemplate = function(scene, $event) {
        $event.stopPropagation();

        RequestService.post('templatescenes/delete', {scene: {id: scene.id}}, function (res) {
                $rootScope.$broadcast('removeTemplate', scene);
            }, function (error) {
                console.log(error);
            }
        );
    };

    $rootScope.$on('removeTemplate', function(event, data) {
        $scope.sceneTemplates.splice($scope.sceneTemplates.indexOf(data), 1);
    });

    $rootScope.$on('newTemplate', function(event, data) {
        $scope.sceneTemplates.push(data);
    });

}]);

