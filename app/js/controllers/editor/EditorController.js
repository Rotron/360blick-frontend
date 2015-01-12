'use strict';

  app.controller('EditorController', ['$scope', 'AuthService', 'EditorService', 'PrimitiveObjectService', function ($scope, AuthService, EditorService, PrimitiveObjectService) {

      EditorService.init();

      $scope.zoomIn = function(){
          EditorService.zoomIn(0.9);
      }
      $scope.zoomOut = function(){
          EditorService.zoomIn(1.1);
      }

      $scope.addNewObject = function(type){
          EditorService.addNewPrimitive(type);
      }

      $scope.sceneObjects = EditorService.getObjects();

      $scope.supportedPrimitiveObjects = PrimitiveObjectService.getSupportedObjectTypes();


  }]);

