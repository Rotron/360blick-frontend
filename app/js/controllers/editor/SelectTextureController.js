'use strict';

  app.controller('SelectTextureController', ['$scope', '$stateParams', 'PrimitiveObjectService', 'RequestService', function ($scope, $stateParams, PrimitiveObjectService, RequestService) {

      $scope.projectId = $stateParams['projectId'];
      $scope.username = $stateParams['username'];

      $scope.onAssetSelect = function(id){
          $scope.currentAssetId = id;
      };

      $scope.assets = [];

      function getAllAssets() {
          RequestService.post('projects/assets/get_from_project', {project: {id: $stateParams['projectId']}}, function(res) {
                  $scope.assets = res.data;
              }, function(error) {
                  console.log(error);
              }
          );
      }

      getAllAssets();

      //TODO: not really nice, refactor when proper asset functions are available
      function getAssetUrl(assetId){
          return $scope.assets.filter(function(asset) {
              return asset.id === assetId;
          })[0].file.url;
      }

      $scope.selectTexture = function(){
          PrimitiveObjectService.mapTexture($scope.data.item, getAssetUrl($scope.currentAssetId));
      }

  }]);

