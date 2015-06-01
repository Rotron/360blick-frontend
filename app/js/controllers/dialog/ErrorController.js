'use strict';

app.controller('ErrorController', ['$scope', function ($scope) {
    $scope.message = $scope.data.error;

    $scope.okCallback = function () {
        $scope.data.okCallback && $scope.data.okCallback();
    };

}]);

