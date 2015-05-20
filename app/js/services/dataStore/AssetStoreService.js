'use strict';

app.service('AssetStoreService', ['DataStoreFactory', function (DataStoreFactory) {

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

    return new DataStoreFactory(api);

}]);
