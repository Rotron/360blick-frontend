'use strict';

app.controller('ErrorController', ['$scope', function ($scope) {
    // console.log($scope.data);
    $scope.message = $scope.data.description || 'Unexpected Error';
    $scope.title = $scope.data.title || 'Error';

    console.log($scope.data.okCallback)

    $scope.okCallback = function () {
        $scope.data.okCallback && $scope.data.okCallback();
    };

}]);

