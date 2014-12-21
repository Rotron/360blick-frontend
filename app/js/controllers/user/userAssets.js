'use strict';

app.controller('UserAssetsCtrl',['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.username = $stateParams.username;
  }]);
