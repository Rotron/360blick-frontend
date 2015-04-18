app.service('EditorService',['$rootScope', 'PrimitiveObjectService', 'WindowResizeService', '$state', 'RequestService', '$stateParams', function($rootScope, PrimitiveObjectService, WindowResizeService, $state, RequestService, $stateParams) {


    var _this = this;

    /**
     * returns new default scene with lightning
     * @returns {Scene}
     */
    this.getNewScene = function(){
        var scene = new THREE.Scene();

        //TODO: check why exporter has a problem with point light
        var light = new THREE.HemisphereLight( 0x0000ff, 1, 0.8 );
        light.position.set( 10, 11, 12 );
        scene.add( light );
        return scene;
    }

    /**
     * parse scene loaded from api
     * @param res
     */
    function resolveScene(res) {
        console.log(res);
        if(res.data.file) {

            var sceneLoader = new THREE.SceneLoader();
            sceneLoader.parse(JSON.parse(res.data.file), function (e) {
                _this.scene = e.scene;
                _this.render();
            }, '.');
        } else {
            _this.scene = _this.getNewScene();
            _this.render();
        }
    }

    this.render = function() {
        requestAnimationFrame( _this.render );
        _this.renderer.render( _this.scene, _this.camera );
    };

    this.init = function(container){
        this.container = container;
        this.scene = {};
        this.camera = new THREE.PerspectiveCamera( 75, this.container[0].clientWidth / this.container[0].clientHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer({
            precision: 'highp',
            antialias: true

        });
        this.renderer.setClearColor( 0x1C2229, 1);
        this.renderer.setSize( this.container[0].clientWidth, this.container[0].clientHeight );
        this.container[0].appendChild( this.renderer.domElement );

        this.camera.position.z = 10;
        this.camera.position.y = 5;
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        WindowResizeService.init(this.renderer, this.camera, this.container[0]);

        if($state.current.name == 'template'){
            RequestService.get('templatescenes/specific', {scene_id: $stateParams['templateId']}, resolveScene);
        } else {
            RequestService.post('scenes/specific', {scene_id: $stateParams['sceneId']}, resolveScene);
        }

    };

    this.zoomIn = function(zoomFactor){
        this.camera.fov *= zoomFactor;
        this.camera.updateProjectionMatrix();
    };

    this.getObjects = function(){
        return this.scene.children;
    };

    this.addNewPrimitive = function(type){
        var object = PrimitiveObjectService.getObject(type);
        this.scene.add(object);
    }

}]);