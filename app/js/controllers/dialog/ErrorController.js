'use strict';

app.controller('ErrorController', ['$scope', function ($scope) {
    $scope.message = $scope.data.error || 'Unexpected Error';
    $scope.title = $scope.data.title || 'Error';

    $scope.okCallback = function () {
        $scope.data.okCallback && $scope.data.okCallback();
    };

}]);

