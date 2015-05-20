'use strict';

app.service('AssetStoreService', ['DataStoreFactory', function (DataStoreFactory) {

    var api = {
        get: {
            url: 'projects/assets/get_from_project',
            data: function(projectId) {
                return {project: {id: projectId}};
            }
        },
        create: {
            url: 'projects/assets/create',
            data: function(projectId, newAsset) {
                return {project: {id: projectId}, asset: newAsset};
            }
        },
        delete: {
            url: 'projects/assets/delete',
            data: function(assetId) {
                return {asset: {id: assetId}};
            }
        }
    };

    return new DataStoreFactory(api);
}]);
