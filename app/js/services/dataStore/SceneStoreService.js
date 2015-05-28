'use strict';

app.service('SceneStoreService', ['DataStoreFactory', function (DataStoreFactory) {

    // TODO: Add multidimensional support in DataStoreFactory, store data by identityObject
    var api = {
        get: {
            url: 'scenes/get_scenes',
            data: function(identityObject) {
                return {project: {id: identityObject.projectId}};
            }
        },
        create: {
            url: 'scenes/create',
            data: function(identityObject) {
                return {project: {id: identityObject.projectId}, scene: identityObject.newScene};
            }
        },
        delete: {
            url: 'scenes/delete',
            data: function(identityObject) {
                return {scene: {id: identityObject.sceneId}};
            }
        }
    };

    return new DataStoreFactory(api);

}]);
