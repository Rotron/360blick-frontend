'use strict';

  app.controller('NewInteractionController', ['$scope', '$stateParams', 'SUPPORTED_INTERACTIONS', 'RequestService', function ($scope, $stateParams, SUPPORTED_INTERACTIONS, RequestService) {

      $scope.projectId = $stateParams['projectId'];
      $scope.username = $stateParams['username'];

      $scope.interactions = SUPPORTED_INTERACTIONS;

      $scope.interactionParameters = {
          'scene': null,
          'object': null,
          'effectIn': null,
          'effectOut': null
      };

      /**
       * transform interactions to array with necessary parameters
       * @returns {Array}
       */
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

      /**
       * reduce scene object - fix for angular bug TODO: find clean solution
       * @returns {Array}
       */
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

      $scope.currentSceneId = $stateParams['sceneId'];

      RequestService.post('scenes/get_scenes', {project: {id: $stateParams['projectId']}}, function(res) {
              $scope.scenes = res.data;
          }, function(error) {
              console.log(error);
          }
      );
      /**
       * checks if property needs to be shown for specific interaction
       * @param type
       * @returns {boolean}
       */
      $scope.isNeededParameter = function(type) {
          var currentInteraction = $scope.interactions[$scope.currentInteractionId];
          return !!(currentInteraction && currentInteraction.parameters && currentInteraction.parameters.indexOf(type) !== -1);
      };

      $scope.onInteractionSelect = function(id) {
          $scope.currentInteractionId = id;
      };

      $scope.onParameterSelect = function(val, type){
          $scope.interactionParameters[type] = val;
      };

      /**
       * returns parameters needed for specific interaction
       * @param type
       * @returns {*}
       */
      $scope.getInteractionParameters = function(type) {
          if(!$scope.interactions[type].parameters){
              return null;
          }
          var parameters = {};
          $scope.interactions[type].parameters.forEach(function(prop) {
              if($scope.interactionParameters[prop] !== null) {
                parameters[prop] = $scope.interactionParameters[prop];
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

