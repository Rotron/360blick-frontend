'use strict';

app.controller('NewProjectController', ['$scope', '$stateParams', 'RequestService', function ($scope, $stateParams, RequestService) {

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
