'use strict';
app.service('SceneTemplate', ['RequestService',
    function (RequestService) {

    var all = {
        templates: []
    };

    var subscribers = [];

    function update(){
        angular.forEach(subscribers, function(callback){
            callback(all.templates);
        })
    }

    function onSuccess(res){
        all.templates = res.data;
        update();
    }

    this.get = function(callback){
        if(all.templates.length < 1){
            RequestService.get('templatescenes/all', {}, onSuccess.bind(this), function(error) {
                    //console.log(error);
                }
            );
        }
        subscribers.push(callback);
        return all.templates;
    };

    this.create = function(newSceneTemplate){
        if(newSceneTemplate.title){
            RequestService.post('templatescenes/create', {scene: newSceneTemplate}, function(res) {
                    all.templates.push(res.data);
                    update();
                }, function(error) {
                    console.log(error);
                }
            );
        }
    };

    this.delete = function(sceneId){
        if(sceneId != 'undefined'){
            RequestService.post('templatescenes/delete', {scene: {id: sceneId}}, function(res) {
                    update();
                }, function(error) {
                    console.log(error);
                }
            );
        }
    };

}]);
