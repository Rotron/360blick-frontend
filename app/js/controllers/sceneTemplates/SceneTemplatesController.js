'use strict';

app.controller('SceneTemplatesController', ['$scope', 'SceneTemplates', '$rootScope', function ($scope, SceneTemplates, $rootScope) {

    $scope.templates = SceneTemplates.get(function(sceneTemplates){
        $scope.templates = sceneTemplates;
    });

    $rootScope.$on('newSceneTemplateCreated', function(event, data){
        $scope.templates.push(data);
    });

    console.log('test');
}]);

