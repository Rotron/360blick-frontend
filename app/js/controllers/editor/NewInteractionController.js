'use strict';

  app.controller('NewInteractionController', ['$scope', '$stateParams', 'SUPPORTED_INTERACTIONS', 'RequestService', function ($scope, $stateParams, SUPPORTED_INTERACTIONS, RequestService) {

      $scope.projectId = $stateParams['projectId'];
      $scope.username = $stateParams['username'];

      $scope.interactionProperties = {
          'scene': null,
          'object': null,
          'effectIn': null,
          'effectOut': null
      };

      $scope.interactions = SUPPORTED_INTERACTIONS;

      function getInteractionList() {
          var interactions = [];
          for(var key in SUPPORTED_INTERACTIONS) {
              if ( SUPPORTED_INTERACTIONS.hasOwnProperty(key) ) {
                  interactions.push({
                      id: key,
                      title: SUPPORTED_INTERACTIONS[key].title
                  })
              }
          }
          return interactions;
      }
      $scope.interactionsList = getInteractionList();
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
          var currentInteraction = $scope.interactions[$scope.currentInteractionId];
          return currentInteraction && currentInteraction.properties && currentInteraction.properties.indexOf(type) !== -1;
      };

      $scope.onInteractionSelect = function(id) {
          $scope.currentInteractionId = id;

      };

      $scope.onPropertySelect = function(val, type){
          $scope.interactionProperties[type] = val;
      };

      $scope.getInteractionParameters = function(type) {
          if(!$scope.interactions[type].properties){
              return null;
          }
          var parameters = {};
          $scope.interactions[type].properties.forEach(function(prop) {
              if($scope.interactionProperties[prop] !== null) {
                parameters[prop] = $scope.interactionProperties[prop];
              }
          });
          return parameters;
      };

      $scope.addInteraction = function() {
          var interactionObject = {
              type: $scope.currentInteractionId,
              parameters: $scope.getInteractionParameters($scope.currentInteractionId)
          };
          if(!$scope.data.item.custom) $scope.data.item.custom = {};
          $scope.data.item.custom.interaction = interactionObject;
      }

  }]);

