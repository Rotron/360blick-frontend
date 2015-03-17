'use strict';

app.controller('UserProjectsController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.username = $stateParams.username;
}]);
