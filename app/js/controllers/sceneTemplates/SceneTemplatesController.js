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

    $scope.renameTemplate = function() {
        // TODO: implement
        console.log('not implemented.');
    };

    $scope.deleteTemplate = function(scene) {
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

    $scope.onOrderSelect = function(id) {
        $scope.order.predicate = predicateOptions[id];
    };

    var predicateOptions = ['updated_at', 'title'];

    $scope.order = {
        reverse: true,
        predicate: predicateOptions[0],
        items: [
            {
                id: 0,
                title: 'Most Recent'
            }, {
                id: 1,
                title: 'Title'
            }
        ]
    };

    var editOptions = {
        'delete': $scope.deleteTemplate,
        'rename': $scope.renameTemplate
    };

    $scope.onEditSelect = function(id, item) {
        editOptions[id](item);
    };

    $scope.edit = {
        items: [
            {
                id: 'delete',
                title: 'Delete',
                icon: 'fa-trash-o'
            }, {
                id: 'rename',
                title: 'Rename',
                icon: 'fa-pencil'
            }
        ]
    };

}]);

