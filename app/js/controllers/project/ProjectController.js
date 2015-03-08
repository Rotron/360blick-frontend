'use strict';

app.controller('ProjectController', ['$scope', '$stateParams', 'RequestService', function ($scope, $stateParams, RequestService) {
    $scope.username = $stateParams['username'];
    $scope.projectId = $stateParams['projectId'];


}]);
