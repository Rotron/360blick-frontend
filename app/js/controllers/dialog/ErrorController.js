'use strict';

app.controller('ErrorController', ['$scope', function ($scope) {
    // console.log($scope.data);
    $scope.message = $scope.data || 'Unexpected Error';
    $scope.title = $scope.data.title || 'Error';

    $scope.okCallback = function () {
        $scope.data.okCallback && $scope.data.okCallback();
    };

}]);

