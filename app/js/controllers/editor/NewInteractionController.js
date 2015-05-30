'use strict';

  app.controller('NewInteractionController', ['$scope', '$stateParams', 'SUPPORTED_INTERACTIONS', 'RequestService', '$filter', function ($scope, $stateParams, SUPPORTED_INTERACTIONS, RequestService, $filter) {

      $scope.projectId = $stateParams['projectId'];
      $scope.username = $stateParams['username'];

      $scope.interactionProperties = {
          'scenes': null,
          'objects': null
      };

      $scope.interactions = SUPPORTED_INTERACTIONS;
      $scope.currentInteractionId = null;

      function getreducedSceneObjects() {
          var objects = $scope.data.item.parent.children;
          var reducedObjects = [];
          for(var i = 0; i < objects.length; i++) {
              if(objects[i].type === 'Mesh' && objects[i].id !== $scope.data.item.id) {
                  reducedObjects.push({
                      id: objects[i].id,
                      title: 'Mesh ' + objects[i].id
                  })
              }
          }
          return reducedObjects;
      }

      $scope.sceneObjects = getreducedSceneObjects();
      $scope.currentObjectId = $scope.data.item.id;

      $scope.scenes = [];
      $scope.currentSceneId = $stateParams['sceneId'];

      $scope.onInteractionSelect = function(id) {
          $scope.currentInteractionId = id;
      };

      RequestService.post('scenes/get_scenes', {project: {id: $stateParams['projectId']}}, function(res) {
              $scope.scenes = res.data;
          }, function(error) {
              console.log(error);
          }
      );

      $scope.isNeededProperty = function(type) {
          for(var i = 0; i < $scope.interactions.length; i++) {
              if($scope.interactions[i].id == $scope.currentInteractionId && $scope.interactions[i].properties.indexOf(type) !== -1) {
                  return true;
              }
          }
          return false;
      }

      $scope.onInteractionSelect = function(id) {
          $scope.currentInteractionId = id;

      };

      $scope.onPropertySelect = function(val, type){
          $scope.interactionProperties[type] = val;
      };

      $scope.addInteraction = function() {
           console.log($scope.currentInteractionId);
      }

  }]);

