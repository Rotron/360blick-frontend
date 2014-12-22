'use strict';

  app.controller('MainController', ['$scope', 'AuthService', function ($scope, AuthService) {

      $scope.showLoginModal = function(){
          AuthService.showLoginModal();
      }
  }]);

