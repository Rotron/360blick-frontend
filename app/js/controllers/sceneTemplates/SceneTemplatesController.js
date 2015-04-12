'use strict';

app.controller('SceneTemplatesController', ['$scope', 'SceneTemplates', '$rootScope', '$stateParams', function ($scope, SceneTemplates, $rootScope, $stateParams) {

    $scope.username = $stateParams.username;

    $scope.templates = SceneTemplates.get(function(sceneTemplates){
        $scope.templates = sceneTemplates;
    });

    $rootScope.$on('newSceneTemplateCreated', function(event, data){
        $scope.templates.push(data);
    });

}]);

