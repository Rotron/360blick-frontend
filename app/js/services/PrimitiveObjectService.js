app.service('PrimitiveObjectService',['RequestService', 'ENV_CONFIG', 'CameraService', 'SUPPORTED_OBJECTS', '$rootScope', function(RequestService, ENV_CONFIG, CameraService, SUPPORTED_OBJECTS, $rootScope) {

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

    var container = angular.element(document.getElementById('editor-view-container'))[0];

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
    };

    this.getGeometry = function(type, properties) {
        switch(type) {
            case 'SphereGeometry':
                return new THREE.SphereGeometry(
                    properties.radius       || 1,
                    properties.widthSeg     || 100,
                    properties.heightSeg    || 100
                );
                break;
            case 'BoxGeometry':
                return new THREE.BoxGeometry(
                    properties.width        || 1,
                    properties.height       || 1,
                    properties.depth        || 1,
                    properties.widthSeg     || 1,
                    properties.heightSeg    || 1,
                    properties.depthSeg     || 1
                );
                break;
            case 'PlaneGeometry':
                return new THREE.PlaneGeometry(
                    properties.width        || 1,
                    properties.height       || 4,
                    properties.widthSeg     || 6,
                    properties.heightSeg    || 6
                );
                break;
            case 'CylinderGeometry':
                return new THREE.CylinderGeometry(
                    properties.radiusTop    || 1,
                    properties.radiusBottom || 1,
                    properties.height       || 5,
                    properties.radiusSeg    || 200,
                    properties.heightSeg    || 200
                );
                break;
        }
    };

    this.getMaterial = function(properties) {
        console.log(properties);
        var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0x0088DA, specular: 0x000099, shininess: 30, shading: THREE.FlatShading, side: THREE.DoubleSide } );
        material.side = THREE.DoubleSide;
        material.transparent = true;
        return material;
    };

    this.setDefault = function(object) {
        var cameralookAt = CameraService.getLookAtPoint(20);
        object.position.x = cameralookAt.x;
        object.position.y = cameralookAt.y;
        object.position.z = cameralookAt.z;
        object.rotation.y = CameraService.getCamera().rotation.y;
    };

    this.setPosition = function(object, properties) {
        if(typeof properties.positionX == 'number')
            object.position.set(properties.positionX, properties.positionY, properties.positionZ);
    };

    this.setRotation = function(object, properties) {
        if(typeof properties.rotationX == 'number')
            object.rotation.set(properties.rotationX, properties.rotationY, properties.rotationZ);
    };

    this.setScale = function(object, properties) {
        if(typeof properties.scaleX == 'number')
            object.scale.set(properties.scaleX, properties.scaleY, properties.scaleZ);
    };

    this.getObject = function(type, properties) {

        properties = typeof properties !== 'undefined' ? properties : {};

        if(type == 'PointLight' || type == 'DirectionalLight'){
            return this.getLight(type, properties);
        }

        var object = new THREE.Mesh( this.getGeometry(type, properties), this.getMaterial(properties) );

        if(properties.material && properties.material.mapImage) {
            this.mapTexture(object, properties.material.mapImage, properties);
        }
        this.setDefault(object);
        this.setPosition(object, properties);
        this.setRotation(object, properties);
        this.setScale(object, properties);
        return object;
    };

    this.getColor = function(hexString) {
        return 0xffffff; //TODO: get real color value from imported object
    };

    this.getLight = function(type, properties) {
        console.log(properties.hex);
        switch(type) {
            case 'PointLight':
                return new THREE.PointLight(
                    this.getColor(properties.hex),
                    properties.intensity || 1,
                    properties.distance  || 0
                );
                break;
        }
    };

    this.getSupportedObjectTypes = function(){
        return SUPPORTED_OBJECTS;
    };

    this.mapTexture = function(item, assetUrl, parameters){
        THREE.ImageUtils.crossOrigin = '';
        item.material = new THREE.MeshPhongMaterial( {
            side: THREE.DoubleSide,
            map: THREE.ImageUtils.loadTexture(ENV_CONFIG.assets + assetUrl)
        } );
        if(parameters.material && parameters.material.mapOffsetX){
            item.material.map.offset.x = parameters.material.mapOffsetX;
            item.material.map.offset.y = parameters.material.mapOffsetY;
            item.material.map.repeat.x = parameters.material.mapRepeatX;
            item.material.map.repeat.y = parameters.material.mapRepeatY;
        }
        if ($rootScope.$$phase != '$apply' && $rootScope.$$phase != '$digest') {
            $rootScope.$apply();
        }
    }

}]);