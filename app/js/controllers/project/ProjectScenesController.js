'use strict';

app.controller('ProjectScenesController', ['$scope', '$stateParams', 'RequestService', '$rootScope', '$state', 'ModalService', 'ENV_CONFIG', function ($scope, $stateParams, RequestService, $rootScope, $state, ModalService, ENV_CONFIG) {
    $scope.username = $stateParams.username;
    $scope.projectId = $stateParams.projectId;

    $scope.rootUrl = ENV_CONFIG.assets;

    $scope.scenes = [];

    function getAllScenes() {
        RequestService.post('scenes/get_scenes', {project: {id: $stateParams['projectId']}}, function(res) {
                for(var i = 0, len = res.data.length; i < len; i++) {
                    res.data[i] = checkScenePreviewImage(res.data[i]);
                }
                $scope.scenes = res.data;
            }, function(error) {
                console.log(error);
            }
        );
    }

    function checkScenePreviewImage(scene) {

        if(!scene.preview_image_output) {
            if(scene.preview_image && scene.preview_image.length > 1) {
                scene.preview_image_output = $scope.rootUrl + scene.preview_image
            } else {
                scene.preview_image_output = ENV_CONFIG.preview_image;
                scene.preview_image_color = "RGBA(100,100,160, 0.5)";
            }
        }

        return scene;
    }

    getAllScenes();

    $scope.settingScene = function(item) {
        $state.go('user.project.scenes.settings', {sceneId: item.id});
    };

    $scope.deleteScene = function(scene) {
        var confirmCallback = function() {
            RequestService.post('scenes/delete', {scene: {id: scene.id}}, function(res) {
                    $rootScope.$broadcast('removeScene', scene);
                }, function(error) {
                    console.log(error);
                }
            );
        };

        ModalService.openModal('confirm', {
            title: 'Delete Scene?',
            message: 'Delete Scene? This action cannot be revoked.',
            confirmCallback: confirmCallback,
            cancelCallback: function() {}
        });
    };

    $rootScope.$on('removeScene', function(event, data){
        $scope.scenes.splice($scope.scenes.indexOf(data), 1);
    });

    $rootScope.$on('newScene', function(event, data){
        $scope.scenes.push(checkScenePreviewImage(data));
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
