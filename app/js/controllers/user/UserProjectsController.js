'use strict';

app.controller('UserProjectsController', ['$scope', '$rootScope', '$stateParams', 'RequestService', 'Project', function ($scope, $rootScope, $stateParams, RequestService, Project) {
    $scope.username = $stateParams['username'];


    $scope.projects = Project.get(function(projects){
        $scope.projects = projects;
    });

    $scope.deleteProject = function(projectId){
        RequestService.post('projects/delete', {projectId: projectId}, function(res) {
                console.log(res);
            }, function(error) {
                console.log(error);
            }
        );

    }

}]);

