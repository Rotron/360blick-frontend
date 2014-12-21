'use strict';

app.controller('UserSettingsCtrl',['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.username = $stateParams.username;
  }]);
