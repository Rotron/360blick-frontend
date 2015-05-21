'use strict';

app.service('AssetStoreService', ['DataStoreFactory', 'RequestService', '$rootScope', function (DataStoreFactory, RequestService, $rootScope) {

    var api = {
        get: {
            url: 'projects/assets/get_from_project',
            data: function(identityObject) {
                return {project: {id: identityObject.projectId}};
            }
        },
        create: {
            url: 'projects/assets/create',
            data: function(identityObject) {
                return {project: {id: identityObject.projectId}, asset: identityObject.newAsset};
            }
        },
        delete: {
            url: 'projects/assets/delete',
            data: function(identityObject) {
                return {asset: {id: identityObject.assetId}};
            }
        }
    };

    var AssetStore = new DataStoreFactory(api);

    $rootScope.$on('newAsset', (function(event, data) {
        console.log(data, AssetStore.data.items);
        AssetStore.data.items.push(data);
        console.log(AssetStore.data.items);

    }).bind(this));

    AssetStore.create = function(scope, element) {
        RequestService.upload(scope, element);
    };

    return AssetStore;

}]);
