'use strict';

app.controller('NewSceneTemplateController', ['$scope', 'RequestService', '$rootScope', function ($scope, RequestService, $rootScope) {

    $scope.newSceneTemplate = {
        title: null,
        description: null
    };

    $scope.createNewSceneTemplate = function() {
        RequestService.post('templatescenes/create', {scene: {title: $scope.newSceneTemplate.title}}, function (res) {
                $rootScope.$broadcast('newTemplate', res.data);
            }, function (error) {
                console.log(error);
            }
        );
    };

}]);
