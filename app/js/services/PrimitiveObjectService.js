app.service('PrimitiveObjectService',['RequestService', 'ENV_CONFIG', function(RequestService, ENV_CONFIG) {

/*    var supportedObjects = [
        'sphere',
        'cube',
        'plane',
        'cylinder'
    ];*/

    var supportedObjects = [
        {
            title: '3D Primitives',
            items: [
                'sphere',
                'cube',
                'plane',
                'cylinder'
            ]
        }, {
            title: '2D Primitives',
            items: [
                'empty',
                'empty'
            ]
        }, {
            title: 'Models',
            items: [
                'empty',
                'empty'
            ]
        }
    ];

    var container = angular.element(document.getElementById('editor-view-container'))[0];

    function setMaterialProperties(object){
        object.material.side = THREE.DoubleSide;
        object.material.transparent = true;
    }

    this.getObject = function(type) {

//        if(supportedObjects.indexOf(type) == -1){
//            throw 'selected object not supported';
//        }
        var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0x0088DA, specular: 0x000099, shininess: 30, shading: THREE.FlatShading, side: THREE.DoubleSide } );
        var geometry;

        switch(type) {
            case 'sphere':
                geometry = new THREE.SphereGeometry( 1, 100, 100 );
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
        setMaterialProperties(object);

        return object;
    };

    this.getSupportedObjectTypes = function(){
        return supportedObjects;
    };

    this.mapTexture = function(item, assetUrl){
        THREE.ImageUtils.crossOrigin = '';
        item.material = new THREE.MeshPhongMaterial( {
            side: THREE.DoubleSide,
            map: THREE.ImageUtils.loadTexture(ENV_CONFIG.assets + assetUrl)
        } );
    }

}]);