'use strict';

app.controller('ProjectSceneSettingsController', ['$scope', '$stateParams', 'RequestService', '$rootScope', 'ENV_CONFIG', function ($scope, $stateParams, RequestService, $rootScope, ENV_CONFIG) {
  $scope.username = $stateParams.username;
  $scope.sceneId = $stateParams.sceneId


  $scope.uploadOptions = {
      broadcastDomain: 'updatedScenePreviewImage',
      apiEndPoint: 'scenes/update',
      paramName: 'data[scene][preview_image]',
      uploadData: {scene: {id: $scope.sceneId}},
      modalHeader: 'New Preview Image'
  };

  $rootScope.$on('updatedScenePreviewImage', function(event, data) {
      console.log('new project image:', data);
      $scope.scene.preview_image = data.preview_image;
  });

  RequestService.post('scenes/specific', {scene_id: $scope.sceneId}, function(res) {
          console.log(res.data);
          $scope.scene = res.data;
      }, function(error) {
          console.log(error);
      }
  );

  $scope.updateSceneSettings = function($event) {
      $event.stopPropagation();

      var data = {
          scene: {
              id: $scope.scene.id,
              title: $scope.scene.title
          }
      };
      RequestService.post('scenes/update', data, function(res) {
            $scope.scene = res.data;
          }, function(error) {
              console.log(error);
          }
      );
  };

}]);
