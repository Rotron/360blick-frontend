app.service('EditorService',['PrimitiveObjectService', function(PrimitiveObjectService) {

    var scene, camera, renderer, container;
    this.init = function(){
        container = angular.element(document.getElementById('editor-view-container'))[0];
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );
        renderer = new THREE.WebGLRenderer({
            precision: 'highp',
            antialias: true

        });
        console.log(container);
        renderer.setSize( container.clientWidth, container.clientHeight );
        container.appendChild( renderer.domElement );

        var axes = new THREE.AxisHelper(100);
        scene.add(axes);
        var gridXZ = new THREE.GridHelper(100, 1);
        scene.add(gridXZ);

        camera.position.z = 10;
        camera.position.y = 5;
        camera.lookAt(new THREE.Vector3(0,0,0));

        var light = new THREE.PointLight( 0xff0000, 1, 100 );
        light.position.set( 10, 10, 10 );
        scene.add( light );

        function render() {
            requestAnimationFrame( render );
            renderer.render( scene, camera );
        }
        render();
    };

    this.zoomIn = function(zoomFactor){
        camera.fov *= zoomFactor;
        camera.updateProjectionMatrix();
    };

    this.getObjects = function(){
        return scene.children;
    };

    this.addNewPrimitive = function(type){
        var object = PrimitiveObjectService.getObject(type);
        scene.add(object);
    }

}]);