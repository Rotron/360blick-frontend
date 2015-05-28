'use strict';

app.controller('NewSceneTemplateController', ['$scope', 'TemplateStoreService', function ($scope, TemplateStoreService) {


    $scope.newScene = {
        title: null,
        description: null
    };

    $scope.createNewSceneTemplate = function() {
        TemplateStoreService.createData({newSceneTemplate: $scope.newSceneTemplate.title});
    };
}]);
