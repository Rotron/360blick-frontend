app.service('EditorService', ['$rootScope', 'PrimitiveObjectService', 'WindowResizeService', '$state', 'RequestService', '$stateParams', 'CameraService', 'HistoryService', 'LoadSceneService',
    function($rootScope, PrimitiveObjectService, WindowResizeService, $state, RequestService, $stateParams, CameraService, HistoryService, LoadSceneService) {


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
     * parse scene loaded from api
     * @param res
     */
    function resolveScene(scene) {
        if(scene) {
            _this.scene = scene;
            if ($rootScope.$root.$$phase != '$apply' && $rootScope.$root.$$phase != '$digest') {
                $rootScope.$apply();
            }
        } else {
            _this.scene = _this.getNewScene();
        }
        _this.render();
    }

    //TODO: move to shortcutservice
    document.onkeydown = function(event) {
        if (event.keyCode == 37) {
            CameraService.rotate(Math.PI/200);
        }
        if (event.keyCode == 39) {
            CameraService.rotate(-(Math.PI/200));
        }
    }

    this.render = function() {
        requestAnimationFrame( _this.render );
        _this.renderer.render( _this.scene, _this.camera );
    };

    this.init = function(container){
        this.container = container;
        this.scene = {};
        this.camera = CameraService.init(this.container);
        this.renderer = new THREE.WebGLRenderer({
            precision: 'highp',
            antialias: true,
            alpha: true

        });
        this.renderer.setClearColor( 0x1C2229, 1);
        this.renderer.setSize( this.container[0].clientWidth, this.container[0].clientHeight );
        this.renderer.shadowMapEnabled = true;
        this.container[0].appendChild( this.renderer.domElement );

        WindowResizeService.init(this.renderer, this.camera, this.container[0]);
        var isTemplateScene = $state.current.name == 'template';
        LoadSceneService.getScene($stateParams['sceneId'], isTemplateScene, resolveScene);

    };

    this.zoomIn = function(zoomFactor){
        CameraService.zoom(zoomFactor);
    };

    this.getObjects = function(){
        return this.scene.children;
    };

    this.addNewPrimitive = function(type){
        var object = PrimitiveObjectService.getObject(type);
        this.scene.add(object);
        HistoryService.queue({
            message: 'object [' + type + '] added',
            uuid: object.uuid,
            callback: (function() {
                this.scene.remove(object);
            }).bind(this)
        });
    }

    this.remove = function(object){
        this.scene.remove(object);
        HistoryService.queue({
            message: 'object removed',
            uuid: object.uuid,
            callback: (function() {
                this.scene.add(object);
            }).bind(this)
        });
    }

}]);