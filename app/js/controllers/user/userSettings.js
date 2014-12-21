'use strict';

angular.module('360blickFrontendApp')
  .controller('UserSettingsCtrl',['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.username = $stateParams.username;
  }]);
