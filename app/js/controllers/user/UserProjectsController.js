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

}]);

