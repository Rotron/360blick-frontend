'use strict';

app.controller('AccountSettingsController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.username = $stateParams.username;
}]);
