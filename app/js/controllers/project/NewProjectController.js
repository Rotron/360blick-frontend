'use strict';

app.controller('NewProjectController', ['$scope', '$rootScope', '$stateParams', 'RequestService', 'Project', function ($scope, $rootScope, $stateParams, RequestService, Project) {

    $scope.newProject = {
        title: null,
        description: null
    };

    $scope.createNewProject = function(){
        Project.createData($scope.newProject);
    }
}]);
