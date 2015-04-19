'use strict';

describe('Vendor:SceneImporterExporter: ', function () {

    beforeEach(module('360blickFrontendApp'));

    var EditorService, scope, scene, light, sceneLoader, exporter, originalScene, exportedScene, importedScene;

    function importScene(){
        sceneLoader = new THREE.SceneLoader();
        sceneLoader.parse(JSON.parse(scene.file), function (e) {
            importedScene = e.scene;
        }, '.');
        return importedScene;
    }

    function exportScene(){
        exporter = new THREE.SceneExporter();
        exportedScene = JSON.stringify(exporter.parse(originalScene));
        return scene = {
            file: exportedScene
        };
    }

    beforeEach(inject(['EditorService', '$rootScope', function (EditorService, $rootScope) {
        scope = $rootScope.$new();
        originalScene = EditorService.getNewScene();
        originalScene.children = [];
    }]));

    it('has the same type', function () {
        exportScene();
        importScene();
        expect(originalScene.type).toEqual(importedScene.type);
    });

    it('has the same number of children', function () {
        exportScene();
        importScene();
        expect(originalScene.children.length).toEqual(importedScene.children.length);
    });

    describe('lights: ', function () {

        it('HemisphereLight', function () {
            light = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.8 );
            light.position.set( 10, 11, 12 );
            originalScene.add( light );
            exportScene();
            importScene();
            for(var i = 0; i < originalScene.children.length; i++){
                expect(originalScene.children[i].type).toEqual(importedScene.children[i].type);
                expect(originalScene.children[i].skyColor).toEqual(importedScene.children[i].skyColor);
                expect(originalScene.children[i].groundColor).toEqual(importedScene.children[i].groundColor);
                expect(originalScene.children[i].intensity).toEqual(importedScene.children[i].intensity);
                expect(originalScene.children[i].position).toEqual(importedScene.children[i].position);
            }
        });

        it('AmbientLight', function () {
            light = new THREE.AmbientLight( 0x404040 ); // soft white light
            originalScene.add( light );
            exportScene();
            importScene();
            for(var i = 0; i < originalScene.children.length; i++){
                expect(originalScene.children[i].type).toEqual(importedScene.children[i].type);
                expect(originalScene.children[i].hex).toEqual(importedScene.children[i].hex);
            }
        });

        it('AreaLight', function () {
            light = new THREE.AreaLight( 0xffffff, 1 );
            light.position.set( 0.0001, 10.0001, -18.5001 );
            light.rotation.set( -0.74719, 0.0001, 0.0001 );
            light.width = 10;
            light.height = 1;
            originalScene.add( light );
            exportScene();
            importScene();
            for(var i = 0; i < originalScene.children.length; i++){
                expect(originalScene.children[i].type).toEqual(importedScene.children[i].type);
                expect(originalScene.children[i].hex).toEqual(importedScene.children[i].hex);
                expect(originalScene.children[i].intensity).toEqual(importedScene.children[i].intensity);
                expect(originalScene.children[i].position).toEqual(importedScene.children[i].position);
                expect(originalScene.children[i].rotation[0]).toEqual(importedScene.children[i].rotation[0]);
                expect(originalScene.children[i].width).toEqual(importedScene.children[i].width);
                expect(originalScene.children[i].height).toEqual(importedScene.children[i].height);
            }
        });

        it('PointLight', function () {
            light = new THREE.PointLight( 0xff0000, 1, 100 );
            light.position.set( 50, 50, 50 );
            originalScene.add( light );
            exportScene();
            importScene();
            for(var i = 0; i < originalScene.children.length; i++){
                expect(originalScene.children[i].type).toEqual(importedScene.children[i].type);
                expect(originalScene.children[i].hex).toEqual(importedScene.children[i].hex);
                expect(originalScene.children[i].intensity).toEqual(importedScene.children[i].intensity);
                expect(originalScene.children[i].position).toEqual(importedScene.children[i].position);
            }
        });


    });

    describe('primitives: ', function () {
        it('Geometry:', function () {
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
            var cube = new THREE.Mesh( geometry, material );
            originalScene.add( cube );
            exportScene();
            importScene();
            for(var i = 0; i < originalScene.children.length; i++){
                expect(originalScene.children[i].type).toEqual(importedScene.children[i].type);
                expect(originalScene.children[i].position).toEqual(importedScene.children[i].position);
                expect(originalScene.children[i].rotation[0]).toEqual(importedScene.children[i].rotation[0]);
                expect(originalScene.children[i].width).toEqual(importedScene.children[i].width);
                expect(originalScene.children[i].height).toEqual(importedScene.children[i].height);
                expect(originalScene.children[i].depth).toEqual(importedScene.children[i].depth);
                expect(originalScene.children[i].scale).toEqual(importedScene.children[i].scale);
                expect(originalScene.children[i].visible).toEqual(importedScene.children[i].visible);
                expect(originalScene.children[i].vertices).toEqual(importedScene.children[i].vertices);
                expect(originalScene.children[i].faces).toEqual(importedScene.children[i].faces);
            }
        });
    });

    describe('Meshmaterial: ', function () {

        function equalMaterial(material){
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var cube = new THREE.Mesh( geometry, material );
            originalScene.add( cube );
            exportScene();
            importScene();
            for(var i = 0; i < originalScene.children.length; i++){
                expect(originalScene.children[i].material.side).toEqual(importedScene.children[i].material.side);
                expect(originalScene.children[i].material.opacity).toEqual(importedScene.children[i].material.opacity);
                expect(originalScene.children[i].material.color).toEqual(importedScene.children[i].material.color);
                expect(originalScene.children[i].material.transparent).toEqual(importedScene.children[i].material.transparent);
                expect(originalScene.children[i].material.alphaTest).toEqual(importedScene.children[i].material.alphaTest);
            }
        }
        it('MeshBasicMaterial:', function () {
            equalMaterial(new THREE.MeshBasicMaterial( {color: 0x00ff00, opacity: 0.6, side: THREE.DoubleSide, visible: false } ));
        });
        it('MeshPhongMaterial:', function () {
            equalMaterial(new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, opacity: 0.7, shininess: 30, shading: THREE.FlatShading, side: THREE.DoubleSide } ));
        });
        it('MeshLambertMaterial:', function () {
            equalMaterial(new THREE.MeshLambertMaterial({ color : 'red', opacity: 0.8, side: THREE.DoubleSide, visible: true }));
        });
    });

});
