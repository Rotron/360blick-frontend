'use strict';

  app.controller('MainCtrl', ['$scope', 'Login', function ($scope, LoginService) {

      $scope.showLoginModal = function(){
          LoginService.showLoginModal();
      }
  }]);

