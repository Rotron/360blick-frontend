'use strict';

app.controller('NewProjectController', ['$scope', 'RequestService', '$rootScope', function ($scope, RequestService, $rootScope) {

    $scope.newProject = {
        title: null,
        description: null,
        is_private: true
    };

    $scope.createNewProject = function() {
        RequestService.post('projects/create', {project: $scope.newProject}, function (res) {
                $rootScope.$broadcast('newProject', res.data);
            }, function (error) {
                console.log(error);
            }
        );
    };

}]);
