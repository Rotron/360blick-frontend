'use strict';

  app.controller('EditorController', ['$scope', '$rootScope', 'AuthService', 'EditorService', 'PrimitiveObjectService', '$stateParams', function ($scope, $rootScope, AuthService, EditorService, PrimitiveObjectService, $stateParams) {

      $scope.projectId = $stateParams['projectId'];
      $scope.username = $stateParams['username'];
      
      function initController(){
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
      }

      if(!$rootScope.editorControllerLoaded){
          initController();
          $rootScope.editorControllerLoaded = true;
      }
  }]);

