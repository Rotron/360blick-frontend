app.service('PrimitiveObjectService',[ function() {

    var supportedObjects = [
        'sphere',
        'cube',
        'plane',
        'cylinder'
    ];

    var container = angular.element(document.getElementById('editor-view-container'))[0];

    function setMaterialProperties(object){
        object.material.side = THREE.DoubleSide;
        object.material.transparent = true;
    }

    this.getObject = function(type){

        if(supportedObjects.indexOf(type) == -1){
            throw 'selected object not supported';
        }
        var objectCamera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );
        var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );
        var geometry;

        switch(type) {
            case 'sphere':
                geometry = new THREE.SphereGeometry( 1, 200, 200 );
                break;
            case 'cube':
                geometry = new THREE.BoxGeometry( 1, 1, 1 );
                break;
            case 'plane':
                geometry = new THREE.PlaneGeometry( 1, 4, 6 );
                break;
            case 'cylinder':
                geometry = new THREE.CylinderGeometry( 1, 1, 5, 200 );
                break;
        }
        var object = new THREE.Mesh( geometry, material );
        object.add(objectCamera);
        setMaterialProperties(object);

        return object;
    }

    this.getSupportedObjectTypes = function(){
        return supportedObjects;
    }

}]);