app.service('PrimitiveObjectService',['RequestService', 'ENV_CONFIG', 'CameraService', 'SUPPORTED_OBJECTS', '$rootScope', function(RequestService, ENV_CONFIG, CameraService, SUPPORTED_OBJECTS, $rootScope) {

    /********************************** copy to player (objectLoader) **************************************************/
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

    this.getMaterial = function() {
        var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0x0088DA, specular: 0x000099, shininess: 30, shading: THREE.FlatShading, side: THREE.DoubleSide } );
        material.side = THREE.DoubleSide;
        material.transparent = true;
        return material;
    };

    this.setDefault = function(object) {
        if(CameraService) {
            var cameralookAt = CameraService.getLookAtPoint(20);
            object.position.x = cameralookAt.x;
            object.position.y = cameralookAt.y;
            object.position.z = cameralookAt.z;
            object.rotation.y = CameraService.getCamera().rotation.y;
        }
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

        if(type == 'PointLight'){
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

    this.mapTexture = function(item, assetUrl, parameters){
        THREE.ImageUtils.crossOrigin = '';
        item.material = new THREE.MeshPhongMaterial( {
            side: THREE.DoubleSide,
            map: THREE.ImageUtils.loadTexture(ENV_CONFIG.assets + assetUrl)
        } );
        if(parameters && parameters.material && typeof parameters.material.mapOffsetX !== 'undefined'){
            item.material.map.offset.x = parameters.material.mapOffsetX;
            item.material.map.offset.y = parameters.material.mapOffsetY;
            item.material.map.repeat.x = parameters.material.mapRepeatX;
            item.material.map.repeat.y = parameters.material.mapRepeatY;
            item.material.wireframe    = parameters.material.mapWireframes;
            item.material.opacity      = parameters.material.opacity;
        }
        if ($rootScope && $rootScope.$$phase != '$apply' && $rootScope.$$phase != '$digest') {
            $rootScope.$apply();
        }
    };
    /************************************ /copy to player (objectLoader) ************************************************/

    this.getSupportedObjectTypes = function(){
        return SUPPORTED_OBJECTS;
    };

}]);