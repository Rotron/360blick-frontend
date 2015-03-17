'use strict';

app.controller('UserProjectsController', ['$scope', '$stateParams', 'RequestService', function ($scope, $stateParams, RequestService) {
    $scope.username = $stateParams['username'];

    function getAllProjects(){
        RequestService.post('projects/get_own_projects', {}, function(res) {
                $scope.projects = res.data;
            }, function(error) {
                console.log(error);
            }
        );
    }

    getAllProjects();

    $scope.newProject = {
        title: null,
        description: null
    };

    $scope.createNewProject = function(){
        if($scope.newProject.title){
            RequestService.post('projects/create', {project: $scope.newProject}, function(res) {
                    $scope.projects.push(res.data);
                }, function(error) {
                    console.log(error);
                }
            );
        }
    }

}]);

