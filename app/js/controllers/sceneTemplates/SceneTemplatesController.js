'use strict';

app.controller('SceneTemplatesController', ['$scope', 'SceneTemplate', '$rootScope', '$stateParams', function ($scope, SceneTemplate, $rootScope, $stateParams) {

    $scope.username = $stateParams.username;

    $scope.templates = SceneTemplate.get(function(sceneTemplates){
        $scope.templates = sceneTemplates;
    });

    $rootScope.$on('newSceneTemplateCreated', function(event, data){
        $scope.templates.push(data);
    });

}]);

