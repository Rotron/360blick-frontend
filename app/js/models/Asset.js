'use strict';

app.service('Asset', ['RequestService', '$stateParams', '$rootScope',
    function (RequestService, $stateParams, $rootScope) {

    var all = {
        assets: []
    };

    var subscribers = [];

    function update(){
        angular.forEach(subscribers, function(callback){
            callback(all.assets);
        })
    }

    function onSuccess(res){
        all.projects = res.data;
        update();
    }

    this.get = function(projectId, callback){
        if(all.assets.length < 1 || $rootScope.currentUser != $stateParams['username']){
            RequestService.post('projects/assets/get_from_project', {project: {id: projectId}}, onSuccess.bind(this), function(error) {
                    console.log(error);
                }
            );
        }
        subscribers.push(callback);
        return all.assets;
    };

    this.create = function(projectId, newAsset){
        console.log('asset create');
        if(newAsset.title){
            RequestService.post('projects/assets/create', {project: {id: projectId}, asset: newAsset}, function(res) {
                    all.assets.push(res.data);
                    update();
                }, function(error) {
                    console.log(error);
                }
            );
        }
    };

    this.delete = function(assetId){
        if(newProject.title){
            RequestService.post('projects/assets/delete', {asset: {id: assetId}}, function(res) {
                    all.assets.push(res.data);
                    update();
                }, function(error) {
                    console.log(error);
                }
            );
        }
    };

}]);
