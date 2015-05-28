'use strict';

app.service('TemplateStoreService', ['DataStoreFactory', function (DataStoreFactory) {

    var api = {
        get: {
            url: 'templatescenes/all',
            data: function(identityObject) {
                return {};
            }
        },
        create: {
            url: 'templatescenes/create',
            data: function(identityObject) {
                return {scene: {title: identityObject.newSceneTemplate}};
            }
        },
        delete: {
            url: 'templatescenes/delete',
            data: function(identityObject) {
                return {scene: {id: identityObject.sceneId}};
            }
        }
    };

    return new DataStoreFactory(api);

}]);
