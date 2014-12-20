'use strict';

angular.module('360blickFrontendApp')
  .controller('UserViewCtrl',['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.username = $stateParams.username;
  }]);
