'use strict';

app.controller('UserProjectsController', ['$scope', '$stateParams', 'RequestService', '$rootScope', function ($scope, $stateParams, RequestService, $rootScope) {
    $scope.username = $stateParams['username'];

    $scope.projects = [];

    function getAllProjects() {
        RequestService.post('projects/get_projects', {user_nick: $scope.username}, function (res) {
                $scope.projects = res.data;
            }, function (error) {
                console.log(error);
            }
        );
    }

    getAllProjects();

    $scope.renameProject = function() {
        console.log('not implemented. just go to settings.');
    };

    $scope.deleteProject = function(project, $event) {
        $event.stopPropagation();

        RequestService.post('projects/delete', {project: {id: project.id}}, function (res) {
                $rootScope.$broadcast('removeProject', project);
            }, function (error) {
                console.log(error);
            }
        );
    };

    $rootScope.$on('removeProject', function(event, data) {
        $scope.projects.splice($scope.projects.indexOf(data), 1);
    });

    $rootScope.$on('newProject', function(event, data) {
        $scope.projects.push(data);
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
        'delete': $scope.deleteProject,
        'rename': $scope.renameProject
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

