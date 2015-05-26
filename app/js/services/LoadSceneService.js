app.service('LoadSceneService', ['RequestService', function (RequestService) {

    this.getScene = function(sceneId, callback) {
        RequestService.post('sceneobjects/get', {scene_id: sceneId, is_templatescene: false}, function(res) {


            callback(res);
        }, function(error) {
            console.log(error);
        });
    }

}]);