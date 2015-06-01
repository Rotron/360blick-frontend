'use strict';

app.controller('ConfirmController', ['$scope', function ($scope) {
    $scope.message = $scope.data.message;
    $scope.title = $scope.data.title;

    $scope.confirmCallback = function () {
        $scope.data.confirmCallback && $scope.data.confirmCallback();
    };

    $scope.cancelCallback = function () {
        $scope.data.cancelCallback && $scope.data.cancelCallback();
    };

}]);

