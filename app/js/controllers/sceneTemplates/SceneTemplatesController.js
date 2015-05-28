'use strict';

app.controller('SceneTemplatesController', ['$scope', 'SceneTemplate', '$rootScope', '$stateParams', function ($scope, SceneTemplate, $rootScope, $stateParams) {
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

    $rootScope.$on('removeTemplate', function(event, data) {
        $scope.projects.splice($scope.sceneTemplates.indexOf(data), 1);
    });

    $rootScope.$on('newTemplate', function(event, data) {
        $scope.sceneTemplates.push(data);
    });

}]);

