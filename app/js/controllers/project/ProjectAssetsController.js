'use strict';

app.controller('ProjectAssetsController', ['$scope', '$stateParams', 'ENV_CONFIG', 'RequestService', '$rootScope', '$state', function ($scope, $stateParams, ENV_CONFIG, RequestService, $rootScope, $state) {
    $scope.username = $stateParams.username;
    var projectId = $stateParams['projectId'];

    $scope.getAssetBackgroundImage = function getAssetBackgroundImage(asset) {
        return {
            'background-image': 'url(' + ENV_CONFIG.assets + asset.file.url + ')'
        };
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

    $scope.settingsAsset = function(item) {
        $state.go('user.project.assets.settings', {assetId: item.id});
    };

    $scope.deleteAsset = function(asset) {
        RequestService.post('projects/assets/delete', {asset: {id: asset.id}}, function(res) {
                $rootScope.$broadcast('removeAsset', asset);;
            }, function(error) {
                console.log(error);
            }
        );
    };

    $rootScope.$on('removeAsset', function(event, data) {
        $scope.assets.splice($scope.assets.indexOf(data), 1);
    });

    $rootScope.$on('newAsset', function(event, data) {
        $scope.assets.push(data);
    });

    $scope.onOrderSelect = function(id) {
        $scope.order.predicate = predicateOptions[id];
    };

    var predicateOptions = ['updated_at', 'title'];

    $scope.order = {
        reverse: true,
        predicate: predicateOptions[0],
        items: [
            {
                id: 0,
                title: 'Most Recent'
            }, {
                id: 1,
                title: 'Title'
            }
        ]
    };

    var editOptions = {
        'settings': $scope.settingsAsset,
        'delete': $scope.deleteAsset
    };

    $scope.onEditSelect = function(id, item) {
        editOptions[id](item);
    };

    $scope.edit = {
        items: [
            {
                id: 'settings',
                title: 'Settings',
                icon: 'fa-gear'
            }, {
                id: 'delete',
                title: 'Delete',
                icon: 'fa-trash-o'
            }
        ]
    };

}]);
