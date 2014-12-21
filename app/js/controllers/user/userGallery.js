'use strict';

app.controller('UserGalleryCtrl',['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.username = $stateParams.username;
  }]);
