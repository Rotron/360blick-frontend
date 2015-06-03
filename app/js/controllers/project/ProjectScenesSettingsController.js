'use strict';

app.controller('ProjectSceneSettingsController', ['$scope', '$stateParams', 'RequestService', '$rootScope', 'ENV_CONFIG', 'ModalService', function ($scope, $stateParams, RequestService, $rootScope, ENV_CONFIG, ModalService) {
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
      $scope.scene.preview_image = ENV_CONFIG.assets + data.preview_image.url;
  });

  RequestService.post('scenes/specific', {scene_id: $scope.sceneId}, function(res) {
          $scope.scene = res.data;
          $scope.scene.preview_image = ENV_CONFIG.assets + $scope.scene.preview_image;
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
            ModalService.openModal('info', {title: 'Success', message: 'Successfully saved changes.'});
          }, function(error) {
              console.log(error);
          }
      );
  };

}]);
