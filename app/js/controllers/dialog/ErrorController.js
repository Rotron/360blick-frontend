'use strict';

app.controller('ErrorController', ['$scope', function ($scope) {
    console.log($scope.data);
    $scope.title = $scope.data.title || 'Error';
    $scope.message = $scope.data.description || 'Unexpected Error';

    $scope.okCallback = function () {
        $scope.data.okCallback && $scope.data.okCallback();
    };

}]);

