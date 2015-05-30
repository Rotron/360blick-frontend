'use strict';

  app.controller('SelectTextureController', ['$scope', '$rootScope', 'Asset', '$stateParams', 'PrimitiveObjectService', function ($scope, $rootScope, Asset, $stateParams, PrimitiveObjectService) {

      $scope.projectId = $stateParams['projectId'];
      $scope.username = $stateParams['username'];

      $scope.assets = Asset.get($stateParams['projectId'], function(assets){
          $scope.assets = assets;
      });

      $scope.onAssetSelect = function(id){
          $scope.currentAssetId = id;
      };

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

