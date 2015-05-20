app.service('PrimitiveObjectService',['RequestService', 'ENV_CONFIG', 'CameraService', function(RequestService, ENV_CONFIG, CameraService) {

    var planeFragmentShader = [

        "uniform vec3 diffuse;",
        "uniform float opacity;",

        THREE.ShaderChunk[ "color_pars_fragment" ],
        THREE.ShaderChunk[ "map_pars_fragment" ],
        THREE.ShaderChunk[ "lightmap_pars_fragment" ],
        THREE.ShaderChunk[ "envmap_pars_fragment" ],
        THREE.ShaderChunk[ "fog_pars_fragment" ],
        THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
        THREE.ShaderChunk[ "specularmap_pars_fragment" ],

        "void main() {",

        "gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );",

        THREE.ShaderChunk[ "map_fragment" ],
        THREE.ShaderChunk[ "alphatest_fragment" ],
        THREE.ShaderChunk[ "specularmap_fragment" ],
        THREE.ShaderChunk[ "lightmap_fragment" ],
        THREE.ShaderChunk[ "color_fragment" ],
        THREE.ShaderChunk[ "envmap_fragment" ],
        THREE.ShaderChunk[ "shadowmap_fragment" ],
        THREE.ShaderChunk[ "linear_to_gamma_fragment" ],
        THREE.ShaderChunk[ "fog_fragment" ],

        "gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 - shadowColor.x );",

        "}"

    ].join("\n");

    var planeMaterial = new THREE.ShaderMaterial({
        uniforms: THREE.ShaderLib['basic'].uniforms,
        vertexShader: THREE.ShaderLib['basic'].vertexShader,
        fragmentShader: planeFragmentShader,
        color: 0x0000FF
    });
    planeMaterial.transparent = true;

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

    this.setMaterialProperties = function(object){
        object.material.side = THREE.DoubleSide;
        object.material.transparent = true;
    };

    this.setObjectShadow = function(object){

        //set object properties
        object.geometry.computeBoundingBox();
        object.castShadow = true;

        //create shadow receiving plane
        var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: false, opacity: 0.2});
        var geometry = new THREE.PlaneGeometry( 10, 10, 10 );
        var shadowPlane = new THREE.Mesh( geometry, planeMaterial );
//        shadowPlane.material.wireframe = true;
        shadowPlane.rotation.x = -1.5;
        shadowPlane.position.y = object.geometry.boundingBox.min.y || 0;
        shadowPlane.receiveShadow = true;
        shadowPlane.castShadow = false;
        object.add(shadowPlane);

        //set shadow light
        var shadowLight = new THREE.SpotLight( 0xffffff );
        shadowLight.position.set( 5, 10, -5 );
        shadowLight.shadowMapWidth = 128;
        shadowLight.shadowMapHeight = 128;

        shadowLight.shadowCameraNear = 10;
        shadowLight.shadowCameraFar = 20;
        shadowLight.shadowCameraFov = 30;

        shadowLight.castShadow = true;
        shadowLight.shadowDarkness = 0.5;
        shadowLight.shadowCameraVisible = true;
        shadowLight.castShadow = true;
        shadowLight.target = object;

        object.add(shadowLight);
        console.log(object);
    }

    this.updateObjectShadow = function(object){

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
        this.setMaterialProperties(object);
        //this.setObjectShadow(object);
        var cameralookAt = CameraService.getLookAtPoint(20);
        object.position.x = cameralookAt.x;
        object.position.y = cameralookAt.y;
        object.position.z = cameralookAt.z;
        object.rotation.y = CameraService.getCamera().rotation.y;
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