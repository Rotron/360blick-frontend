'use strict';

app.controller('UserProjectsController', ['$scope', '$stateParams', 'RequestService', 'ModalService', '$rootScope', '$state', 'ENV_CONFIG', function ($scope, $stateParams, RequestService, ModalService, $rootScope, $state, ENV_CONFIG) {
    $scope.username = $stateParams['username'];

    $scope.projects = [];

    $scope.rootUrl = ENV_CONFIG.assets;

    function getAllProjects() {
        RequestService.post('projects/get_projects', {user_nick: $scope.username}, function (res) {
                for(var i = 0, len = res.data.length; i < len; i++) {
                    res.data[i] = checkProjectPreviewImage(res.data[i]);
                }
                $scope.projects = res.data;
            }, function (error) {
                console.log(error);
            }
        );
    }

    function checkProjectPreviewImage(project) {
        if(!project.preview_image.url) {
            project.preview_image.url = "https://upload.wikimedia.org/wikipedia/commons/6/60/Matterhorn_from_Domh%C3%BCtte_-_2.jpg";
            project.preview_image_color = "RGBA(100,100,160, 0.5)";
        } else {
            if(project.preview_image.url.indexOf("https://upload.wikimedia.org") <= 0) {
                project.preview_image.url = $scope.rootUrl + project.preview_image.url;
            }
        }

        return project;
    }

    function checkProjectPreviewImage(project) {

        if(!project.preview_image_output) {
            if(project.preview_image.url) {
                project.preview_image_output = $scope.rootUrl + project.preview_image.url
            } else {
                project.preview_image_output = ENV_CONFIG.preview_image;
                project.preview_image_color = "RGBA(100,100,160, 0.5)";
            }
        }

        return project;
    }

    getAllProjects();

    $scope.settingsProject = function(item) {
        $state.go('user.project.settings', {projectId: item.id});
    };

    $scope.deleteProject = function(project) {
        var confirmCallback = function() {
            RequestService.post('projects/delete', {project: {id: project.id}}, function (res) {
                    $rootScope.$broadcast('removeProject', project);
                 }, function (error) {
                    console.log(error);
                 }
             );
        };

        ModalService.openModal('confirm', {
            title: 'Delete Project?',
            message: 'Deleting this project will also delete all related Assets and Settings. This action cannot be revoked.',
            confirmCallback: confirmCallback,
            cancelCallback: function() {}
        });
    };

    $rootScope.$on('removeProject', function(event, data) {
        $scope.projects.splice($scope.projects.indexOf(data), 1);
    });

    $rootScope.$on('newProject', function(event, data) {
        $scope.projects.push(checkProjectPreviewImage(data));
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
        'settings': $scope.settingsProject,
        'delete': $scope.deleteProject
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

