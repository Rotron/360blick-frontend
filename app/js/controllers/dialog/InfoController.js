'use strict';

app.controller('InfoController', ['$scope', function ($scope) {
    $scope.message = $scope.data.message || 'Feel loved.';
    $scope.title = $scope.data.title || 'Info';

    $scope.okCallback = function () {
        $scope.data.okCallback && $scope.data.okCallback();
    };

}]);

