app.service('CameraService',[function() {

    this.init = function(container) {
        this.camera = new THREE.PerspectiveCamera( 75, container[0].clientWidth / container[0].clientHeight, 0.1, 1000 );
        return this.camera;
    };

    this.rotate = function(val) {
        this.camera.rotation.y += val;
    };

    this.getLookAtVector = function() {
        var lookAtVector = new THREE.Vector3(0,0, -1);
        lookAtVector.applyQuaternion(this.camera.quaternion);
        return lookAtVector;
    };

    /**
     * returns point in specific distance to camera, in direction of the camera lookAt vector
     * @param distance
     * @returns {}
     */
    this.getLookAtPoint = function(distance) {
        var vector = new THREE.Vector3( 0, 0, (-distance || -20) );
        var axis = new THREE.Vector3( 0, 1, 0 );
        vector.applyAxisAngle( axis, this.camera.rotation._y );
        return vector;
    };

    this.getCamera = function() {
        return this.camera;
    };

    this.zoom = function(zoomFactor) {
        this.camera.fov *= zoomFactor;
        this.camera.updateProjectionMatrix();
    }


}]);