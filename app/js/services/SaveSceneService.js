app.service('SaveSceneService', ['$rootScope', 'EditorService', 'RequestService', function ($rootScope, EditorService, RequestService) {

    var _this = this;

    this.getObjectType = function(object) {
        if(object.type !== 'Mesh') return object.type;
        return object.geometry && object.geometry.type;
    };

    this.setGeneralValues = function(reducedObject, object) {
        angular.extend(reducedObject, {
            id:         object.id || undefined,
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

    this.getReducedObject = function(object) {
        var reducedObject = {};
        this.setGeneralValues(reducedObject, object);

        if(reducedObject.type == 'BoxGeometry') {
            angular.extend(reducedObject, {
                width:  object.geometry.parameters.width,
                height: object.geometry.parameters.height,
                depth:  object.geometry.parameters.depth,
                widthSeg:  object.geometry.widthSegments,
                heightSeg: object.geometry.heightSegments,
                depthSeg:  object.geometry.depthSegments
            });
        }
        if(reducedObject.type == 'PlaneGeometry') {
            angular.extend(reducedObject, {
                width:  object.geometry.parameters.width,
                height: object.geometry.parameters.height,
                widthSeg:  object.geometry.widthSegments,
                heightSeg: object.geometry.heightSegments
            });
        }
        if(reducedObject.type == 'SphereGeometry') {
            angular.extend(reducedObject, {
                radius:  object.geometry.parameters.radius,
                widthSeg:  object.geometry.widthSegments,
                heightSeg: object.geometry.heightSegments
            });
        }
        if(reducedObject.type == 'CylinderGeometry') {
            angular.extend(reducedObject, {
                radiusTop:  object.geometry.parameters.radiusTop,
                radiusBottom:  object.geometry.parameters.radiusBottom,
                height:  object.geometry.parameters.height,
                heightSeg:  object.geometry.heightSegments,
                radiusSeg: object.geometry.radiusSegments
            });
        }
        if(reducedObject.type == 'PointLight') {
            angular.extend(reducedObject, {
                hex:  object.color.getHexString(),
                intensity: object.intensity,
                distance: object.distance
            });
        }

        console.log(reducedObject);
        return reducedObject;
    };

    this.save = function(sceneId){
        var changedObjects = [];
        EditorService.getObjects().forEach(function(object) {
           changedObjects.push(_this.getReducedObject(object));
        });
        console.log(changedObjects);
        RequestService.post('sceneobjects/update', {scene_id: sceneId, is_templatescene: false, sceneobjects: JSON.stringify(changedObjects)}, function(res) {
                console.log(res);
                $rootScope.$broadcast('sceneSaved');
            }, function(error) {
                console.log(error);
            }
        );
    };

}]);