'use strict';

app.controller('ProjectSettingsController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.username = $stateParams.username;
    $scope.projectId = $stateParams.projectId;
}]);
