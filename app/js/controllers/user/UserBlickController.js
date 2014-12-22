'use strict';

app.controller('UserBlickController',['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {
        if(!$stateParams.blickId){
            $state.go('user');
        }
        $scope.username = $stateParams.username;
        $scope.blickId = $stateParams.blickId;
  }]);
