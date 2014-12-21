'use strict';

angular.module('360blickFrontendApp')
  .controller('UserGalleryCtrl',['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.username = $stateParams.username;
  }]);
