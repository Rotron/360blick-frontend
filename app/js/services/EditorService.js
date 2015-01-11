app.service('EditorService',[ function() {

    var scene, camera, renderer, container;
    this.init = function(){
        container = angular.element(document.getElementById('editor-view-container'))[0];
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );
        renderer = new THREE.WebGLRenderer();
        console.log(container);
        renderer.setSize( container.clientWidth, container.clientHeight );
        container.appendChild( renderer.domElement );

        var axes = new THREE.AxisHelper(2);
        scene.add(axes);
        var gridXZ = new THREE.GridHelper(10, 1);
        scene.add(gridXZ);

        var geometry = new THREE.BoxGeometry( 1, 1, 1 ); var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); var cube = new THREE.Mesh( geometry, material ); scene.add( cube ); camera.position.z = 5;

        camera.position.y = 1;

        console.log(scene);

        function render() {
            requestAnimationFrame( render );
            renderer.render( scene, camera );
        }
        render();
    };

    this.zoomIn = function(zoomFactor){
        camera.fov *= zoomFactor;
        camera.updateProjectionMatrix();
    }

    this.getObjects = function(){
        return scene.children;
    }

}]);