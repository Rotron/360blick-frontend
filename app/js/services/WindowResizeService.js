app.service('WindowResizeService',[ function() {

    this.init = function(renderer, camera, container){
        var callback	= function(){
            // notify the renderer of the size change
            renderer.setSize( container.clientWidth, container.clientHeight );
            // update the camera
            camera.aspect	= container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
        }
        // bind the resize event
        window.addEventListener('resize', callback, false);
        // return .stop() the function to stop watching window resize
        return {
            /**
             * Stop watching window resize
             */
            stop	: function(){
                window.removeEventListener('resize', callback);
            }
        };
    }


}]);