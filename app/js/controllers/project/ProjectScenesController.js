'use strict';

app.controller('ProjectScenesController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.username = $stateParams.username;
}]);
