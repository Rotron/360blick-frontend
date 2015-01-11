'use strict';

  app.controller('EditorController', ['$scope', 'AuthService', 'EditorService', function ($scope, AuthService, EditorService) {

      EditorService.init();

      $scope.zoomIn = function(){
          EditorService.zoomIn(0.9);
      }
      $scope.zoomOut = function(){
          EditorService.zoomIn(1.1);
      }

      $scope.sceneObjects = EditorService.getObjects();

  }]);

