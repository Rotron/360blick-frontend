'use strict';

app.controller('ProjectAssetsController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.username = $stateParams.username;
}]);
