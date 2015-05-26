app.service('LoadSceneService', ['RequestService', function (RequestService) {

    var _this = this;

    this.resolve = function(res, callback) {
        var scene = new THREE.Scene();
        res.data.forEach(function(sceneObject) {
            if(sceneObject.name != null) {
                console.log(sceneObject.name);
            }
        });
        callback(scene);
    };

    this.getScene = function(sceneId, isTemplateScene, callback) {
        RequestService.post('sceneobjects/get', {scene_id: sceneId, is_templatescene: isTemplateScene}, function(res) {
            _this.resolve(res, callback);
        }, function(error) {
            console.error(error);
        });
    }

}]);