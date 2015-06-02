'use strict';

app.controller('NewProjectController', ['$scope', 'RequestService', '$rootScope', '$state', function ($scope, RequestService, $rootScope, $state) {

    $scope.newProject = {
        title: null,
        description: null,
        is_private: true
    };

    $scope.createNewProject = function() {
        RequestService.post('projects/create', {project: $scope.newProject}, function (res) {
                $rootScope.$broadcast('newProject', res.data);
                $state.go('user.project', {projectId: res.data.id});
            }, function (error) {
                console.log(error);
            }
        );
    };

}]);
