app.service('ObjectSelectionService',['$rootScope', 'EditorService', function($rootScope, EditorService) {
    //only suitable for editor
    var container = angular.element(document.getElementById('editor-scene-container'))[0];
    var intersects;
    var vector = new THREE.Vector3();
    var raycaster = new THREE.Raycaster();
    var dir = new THREE.Vector3();




    container.addEventListener( 'click', function(event){

        if ( EditorService.camera instanceof THREE.OrthographicCamera ) {

            vector.set( ( event.clientX / container.clientWidth ) * 2 - 1, - ( (event.clientY - container.offsetTop) / container.clientHeight ) * 2 + 1, - 1 ); // z = - 1 important!

            vector.unproject( EditorService.camera );

            dir.set( 0, 0, - 1 ).transformDirection( EditorService.camera.matrixWorld );

            raycaster.set( vector, dir );

        } else if ( EditorService.camera instanceof THREE.PerspectiveCamera ) {

            vector.set( ( event.clientX / container.clientWidth ) * 2 - 1, - ( (event.clientY - container.offsetTop) / container.clientHeight ) * 2 + 1, 0.5 ); // z = 0.5 important!

            vector.unproject( EditorService.camera );

            raycaster.set( EditorService.camera.position, vector.sub( EditorService.camera.position ).normalize() );

        }

        intersects = raycaster.intersectObjects( EditorService.scene.children, true );

        if(intersects.length){
            $rootScope.$emit('objectSelected', intersects[0].object);
        }

    }, false );

}]);