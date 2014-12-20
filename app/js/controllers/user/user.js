'use strict';

angular.module('360blickFrontendApp')
  .controller('UserCtrl',['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.username = $stateParams['username'];
  }]);
