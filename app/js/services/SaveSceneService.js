app.service('SaveSceneService', ['$rootScope', 'EditorService', 'RequestService', 'ENV_CONFIG', function ($rootScope, EditorService, RequestService, ENV_CONFIG) {

    var _this = this;

    this.getObjectType = function(object) {
        if(object.type !== 'Mesh') return object.type;
        return object.geometry && object.geometry.type;
    };

    this.setGeneralValues = function(reducedObject, object) {
        angular.extend(reducedObject, {
            id:         object.custom && object.custom.id || undefined,
            objecttype: this.getObjectType(object),
            name:       object.name,
            positionX:  object.position.x,
            positionY:  object.position.y,
            positionZ:  object.position.z,
            rotationX:  object.rotation.x,
            rotationY:  object.rotation.y,
            rotationZ:  object.rotation.z,
            scaleX:     object.scale.x,
            scaleY:     object.scale.y,
            scaleZ:     object.scale.z
        });
    };

    this.getMapImage = function(object) {
        if(object.material.map && object.material.map.image) {
            return object.material.map.image.currentSrc.replace(ENV_CONFIG.assets, '');
        }
        return null;
    };

    this.setMaterial = function(reducedObject, object) {
        angular.extend(reducedObject, {
            material: {
                name:       object.material.name,
                color:      object.material.color.getHexString(),
                mapImage:   this.getMapImage(object),
                mapOffsetX: object.material.map && object.material.map.offset.x,
                mapOffsetY: object.material.map && object.material.map.offset.y,
                mapRepeatX: object.material.map && object.material.map.repeat.x,
                mapRepeatY: object.material.map && object.material.map.repeat.y,
                ambient:    object.material.ambient.getHexString(),
                specular:   object.material.specular.getHexString(),
                shininess:  object.material.shininess,
                shading:    object.material.shading,
                side:       object.material.side
            }
        });
    };

    this.getReducedObject = function(object) {
        var reducedObject = {};
        this.setGeneralValues(reducedObject, object);

        if(object.type == 'Mesh') this.setMaterial(reducedObject, object);

        if(reducedObject.objecttype == 'BoxGeometry') {
            angular.extend(reducedObject, {
                width:  object.geometry.parameters.width,
                height: object.geometry.parameters.height,
                depth:  object.geometry.parameters.depth,
                widthSeg:  object.geometry.widthSegments,
                heightSeg: object.geometry.heightSegments,
                depthSeg:  object.geometry.depthSegments
            });
        }
        if(reducedObject.objecttype == 'PlaneGeometry') {
            angular.extend(reducedObject, {
                width:  object.geometry.parameters.width,
                height: object.geometry.parameters.height,
                widthSeg:  object.geometry.widthSegments,
                heightSeg: object.geometry.heightSegments
            });
        }
        if(reducedObject.objecttype == 'SphereGeometry') {
            angular.extend(reducedObject, {
                radius:  object.geometry.parameters.radius,
                widthSeg:  object.geometry.widthSegments,
                heightSeg: object.geometry.heightSegments
            });
        }
        if(reducedObject.objecttype == 'CylinderGeometry') {
            angular.extend(reducedObject, {
                radiusTop:  object.geometry.parameters.radiusTop,
                radiusBottom:  object.geometry.parameters.radiusBottom,
                height:  object.geometry.parameters.height,
                heightSeg:  object.geometry.heightSegments,
                radiusSeg: object.geometry.radiusSegments
            });
        }
        if(reducedObject.objecttype == 'PointLight') {
            angular.extend(reducedObject, {
                hex:  object.color.getHexString(),
                intensity: object.intensity,
                distance: object.distance
            });
        }

        return reducedObject;
    };

    this.save = function(sceneId){
        var changedObjects = [];
        EditorService.getObjects().forEach(function(object) {
           changedObjects.push(_this.getReducedObject(object));
        });
        RequestService.post('sceneobjects/update', {scene_id: sceneId, is_templatescene: false, sceneobjects: JSON.stringify(changedObjects)}, function(res) {
                $rootScope.$broadcast('sceneSaved');
            }, function(error) {
                console.log(error);
            }
        );
    };

}]);