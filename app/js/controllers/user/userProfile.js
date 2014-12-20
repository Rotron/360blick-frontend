'use strict';

angular.module('360blickFrontendApp')
  .controller('UserProfileCtrl',['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.username = $stateParams.username;
  }]);
