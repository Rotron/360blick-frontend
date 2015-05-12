'use strict';

  app.controller('EditorController', ['$scope', '$rootScope', 'AuthService', 'EditorService', 'PrimitiveObjectService', '$stateParams', '$state', 'RequestService', function ($scope, $rootScope, AuthService, EditorService, PrimitiveObjectService, $stateParams, $state, RequestService) {

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
      }
      $scope.zoomOut = function(){
          EditorService.zoomIn(1.1);
      }

      $scope.save = function(){
          console.log(EditorService.scene);
          var exporter = new THREE.SceneExporter();
          var sceneJson = JSON.stringify(exporter.parse(EditorService.scene));
          console.log(sceneJson);
          var scene = {
              file: sceneJson
          };
          var route;

          if($state.current.name == 'template'){
              scene.id = $stateParams['templateId'];
              route = 'templatescenes/update';
          }else{
              scene.id = $stateParams['sceneId'];
              route = 'scenes/update';
          }
          RequestService.post(route, {scene: scene}, function(res) {
                  console.log(res);
              }, function(error) {
                  console.log(error);
              }
          );
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

