'use strict';

  app.controller('EditorController', ['$scope', '$rootScope', 'EditorService', 'PrimitiveObjectService', '$stateParams', '$state', 'RequestService', 'HistoryService', 'SaveSceneService', 'CameraService',
      function ($scope, $rootScope, EditorService, PrimitiveObjectService, $stateParams, $state, RequestService, HistoryService, SaveSceneService, CameraService) {

      $scope.projectId = $stateParams['projectId'];
      $scope.username = $stateParams['username'];
      $scope.currentSceneId = $stateParams['sceneId'] ? $stateParams['sceneId'] : $stateParams['templateId'];
      $scope.currentCameraId = 0;

      $scope.hiddenTypes = {
          'Line':               true,
          'PointLight':         true,
          'HemisphereLight':    true,
          'PerspectiveCamera':  true
      };

      $scope.scenes = [];

      function getAllScenes() {
          RequestService.post('scenes/get_scenes', {project: {id: $stateParams['projectId']}}, function(res) {
                  $scope.scenes = res.data;
                  $scope.currentScene = $scope.scenes.filter(function(scene) {
                      return scene.id == $scope.currentSceneId;
                  })[0];
              }, function(error) {
                  console.log(error);
              }
          );
      }
      if($state.is('editor')) {
          $scope.isEditor = true;
          getAllScenes();
      }

      $scope.saveSceneSetting = function() {
          if($state.is('editor')) {//TODO: make it work for templates as well
              RequestService.post('scenes/update', {scene: {id: $scope.currentSceneId, title: $scope.currentScene.title}}, function(res) {

                  }, function(error) {
                      console.log(error);
                  }
              );
          }
      }

      $scope.changeScene = function(sceneId) {
          if($state.is('editor')) {
              $scope.save();
              $state.go('editor', {username: $scope.username, projectId: $scope.projectId, sceneId: sceneId});
          }
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

      $scope.switchCamera = function(id){
          $scope.currentCameraId = EditorService.switchCamera(id);
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

