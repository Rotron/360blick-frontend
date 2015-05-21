'use strict';

  app.controller('EditorController', ['$scope', '$rootScope', 'AuthService', 'EditorService', 'PrimitiveObjectService', '$stateParams', '$state', 'RequestService', 'HistoryService', 'SaveSceneService',
      function ($scope, $rootScope, AuthService, EditorService, PrimitiveObjectService, $stateParams, $state, RequestService, HistoryService, SaveSceneService) {

      $scope.projectId = $stateParams['projectId'];
      $scope.username = $stateParams['username'];

      $scope.hiddenTypes = {
          'Line':               true,
          'PointLight':         true,
          'HemisphereLight':    true,
          'PerspectiveCamera':  true
      };


      $scope.zoomIn = function(){
          EditorService.zoomIn(0.9);
      };
      $scope.zoomOut = function(){
          EditorService.zoomIn(1.1);
      };

      $scope.goBack = function(){
          HistoryService.goBack();
      };

      $scope.save = function(){
            SaveSceneService.save();
      };

      $scope.addNewObject = function(type){
          EditorService.addNewPrimitive(type);
      };

      $scope.getSceneObjects = function(){
          return EditorService.getObjects();
      };


      $scope.getSupportedPrimitiveObjects = function(){
          return PrimitiveObjectService.getSupportedObjectTypes();
      }

  }]);

