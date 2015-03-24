'use strict';

  app.controller('EditorController', ['$scope', '$rootScope', 'AuthService', 'EditorService', 'PrimitiveObjectService', '$stateParams', function ($scope, $rootScope, AuthService, EditorService, PrimitiveObjectService, $stateParams) {

      $scope.projectId = $stateParams['projectId'];
      $scope.username = $stateParams['username'];


      $scope.zoomIn = function(){
          EditorService.zoomIn(0.9);
      }
      $scope.zoomOut = function(){
          EditorService.zoomIn(1.1);
      }

      $scope.addNewObject = function(type){
          EditorService.addNewPrimitive(type);
      }

      $scope.getSceneObjects = function(){
          return EditorService.getObjects();
      };


      $scope.getSupportedPrimitiveObjects = function(){
          return PrimitiveObjectService.getSupportedObjectTypes();
      }

  }]);

