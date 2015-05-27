'use strict';

app.service('ProjectStoreService', ['DataStoreFactory', function (DataStoreFactory) {

    var api = {
        get: {
            url: 'projects/get_projects',
            data: function(identityObject) {
                return {user_nick: identityObject.currentUser};
            }
        },
        create: {
            url: 'projects/create',
            data: function(identityObject) {
                return {project: identityObject};
            }
        },
        delete: {
            url: 'projects/delete',
            data: function(identityObject) {
                return {project: {id: identityObject.projectId}};
            }
        }
    };

    return new DataStoreFactory(api);

}]);
