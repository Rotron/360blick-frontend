'use strict';

  app.controller('EditorController', ['$scope', '$rootScope', 'AuthService', 'EditorService', 'PrimitiveObjectService', '$stateParams', '$state', 'RequestService', 'HistoryService', 'SaveSceneService',
      function ($scope, $rootScope, AuthService, EditorService, PrimitiveObjectService, $stateParams, $state, RequestService, HistoryService, SaveSceneService) {

      $scope.projectId = $stateParams['projectId'];
      $scope.username = $stateParams['username'];
      $scope.currentSceneId = $stateParams['sceneId'] ? $stateParams['sceneId'] : $stateParams['templateId'];

      $scope.hiddenTypes = {
          'Line':               true,
          'PointLight':         true,
          'HemisphereLight':    true,
          'PerspectiveCamera':  true
      };

      $scope.scenes = [];

      RequestService.post('scenes/get_scenes', {project: {id: $stateParams['projectId']}}, function(res) {
              $scope.scenes = res.data;
          }, function(error) {
              console.log(error);
          }
      );

      $scope.changeScene = function(sceneId) {
          $scope.save();
          $state.go('editor', {username: $scope.username, projectId: $scope.projectId, sceneId: sceneId})
      };

      $scope.onSceneSelect = function(sceneId) {
          $scope.changeScene(sceneId);
      };

      $rootScope.$on('newScene', function(event, data) {
          $scope.changeScene(data.id);
      });

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
            SaveSceneService.save($scope.currentSceneId);
      };

      $scope.addNewObject = function(type){
          EditorService.addNewPrimitive(type);
      };

      $scope.getSceneObjects = function(){
          return EditorService.getObjects();
      };

      $scope.getSupportedObjects = function(){
          return PrimitiveObjectService.getSupportedObjectTypes();
      };

  }]);

