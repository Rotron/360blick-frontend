app.service('EditorService',['$rootScope', 'PrimitiveObjectService', 'WindowResizeService', function($rootScope, PrimitiveObjectService, WindowResizeService) {


    var that = this;

    this.init = function(){
        this.container = angular.element(document.getElementById('editor-view-container'))[0];
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer({
            precision: 'highp',
            antialias: true

        });
        console.log(this.container);
        this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
        this.container.appendChild( this.renderer.domElement );

//        var axes = new THREE.AxisHelper(100);
//        axes.position.y = 0.001;
//        this.scene.add(axes);
//        var gridXZ = new THREE.GridHelper(100, 1);
//        this.scene.add(gridXZ);

        this.camera.position.z = 10;
        this.camera.position.y = 5;
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        var light = new THREE.PointLight( 0xff0000, 1, 100 );
        light.position.set( 10, 10, 10 );
        this.scene.add( light );


        WindowResizeService.init(this.renderer, this.camera, this.container);

        function render() {
            requestAnimationFrame( render );
            that.renderer.render( that.scene, that.camera );
        }
        render();
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
        console.log(object);
        this.scene.add(object);
    }

}]);