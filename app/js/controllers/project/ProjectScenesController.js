'use strict';

app.controller('ProjectScenesController', ['$scope', '$stateParams', 'RequestService', '$rootScope', '$state', function ($scope, $stateParams, RequestService, $rootScope, $state) {
    $scope.username = $stateParams.username;
    $scope.projectId = $stateParams.projectId;

    $scope.scenes = [];

    function getAllScenes() {
        RequestService.post('scenes/get_scenes', {project: {id: $stateParams['projectId']}}, function(res) {
                $scope.scenes = res.data;
            }, function(error) {
                console.log(error);
            }
        );
    }

    getAllScenes();

    $scope.settingScene = function(item) {
        $state.go('user.project.scenes.settings', {sceneId: item.id});
    };

    $scope.deleteScene = function(scene, $event) {
        $event && $event.stopPropagation();

        RequestService.post('scenes/delete', {scene: {id: scene.id}}, function(res) {
                $rootScope.$broadcast('removeScene', scene);
            }, function(error) {
                console.log(error);
            }
        );
    };

    $rootScope.$on('removeScene', function(event, data){
        $scope.scenes.splice($scope.scenes.indexOf(data), 1);
    });

    $rootScope.$on('newScene', function(event, data){
        $scope.scenes.push(data);
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
        'delete': $scope.deleteScene,
        'settings': $scope.settingScene
    };

    $scope.onEditSelect = function(id, item) {
        editOptions[id](item);
    };

    $scope.edit = {
        items: [
            {
                id: 'settings',
                title: 'Settings',
                icon: 'fa-gear'
            }, {
                id: 'delete',
                title: 'Delete',
                icon: 'fa-trash-o'
            }
        ]
    };

}]);
