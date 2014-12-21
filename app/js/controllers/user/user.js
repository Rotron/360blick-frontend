'use strict';

app.controller('UserCtrl',['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.username = $stateParams['username'];
  }]);
