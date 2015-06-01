app.service('LoadSceneService', ['RequestService', 'PrimitiveObjectService', function (RequestService, PrimitiveObjectService) {

    var _this = this;

    /**
     * returns new default scene with lightning
     * @returns {Scene}
     */
    this.getNewScene = function(){
        var scene = new THREE.Scene();
        var light = PrimitiveObjectService.getObject('PointLight', {
            positionX: 0,
            positionY: 5,
            positionZ: 10
        });
        scene.add( light );
        return scene;
    };

    /**
     * loops over sceneobjects and gets three.js objects from PrimitiveObjectService
     * @param res
     * @param callback
     */
    this.resolve = function(res, callback) {

        var scene;
        if(res.data.length){
            scene = new THREE.Scene();
            var objectToAdd = {};
            res.data.forEach(function(sceneObject) {
                if(sceneObject.name != null) {
                    objectToAdd = PrimitiveObjectService.getObject(sceneObject.objecttype, sceneObject);
                    scene.add(objectToAdd);
                }
            });
        } else {
            scene = _this.getNewScene();
        }

        callback(scene);
    };

    /**
     * loads sceneObjects from backend
     * @param sceneId
     * @param isTemplateScene
     * @param callback
     */
    this.getScene = function(sceneId, isTemplateScene, callback) {
        RequestService.post('sceneobjects/get', {scene_id: sceneId, is_templatescene: isTemplateScene}, function(res) {
            _this.resolve(res, callback);
        }, function(error) {
            console.error(error);
        });
    }

}]);