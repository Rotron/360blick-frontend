'use strict';

app.controller('UserAssetsController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.username = $stateParams.username;
}]);
