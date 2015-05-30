'use strict';

  app.controller('NewInteractionController', ['$scope', '$stateParams', 'SUPPORTED_INTERACTIONS', 'RequestService', '$filter', function ($scope, $stateParams, SUPPORTED_INTERACTIONS, RequestService, $filter) {

      $scope.projectId = $stateParams['projectId'];
      $scope.username = $stateParams['username']

      $scope.interactions = SUPPORTED_INTERACTIONS;
      $scope.currentInteractionId = null;

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

  }]);

