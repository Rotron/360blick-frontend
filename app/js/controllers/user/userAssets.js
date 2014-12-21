'use strict';

angular.module('360blickFrontendApp')
  .controller('UserAssetsCtrl',['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.username = $stateParams.username;
  }]);
