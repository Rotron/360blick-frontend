'use strict';

describe('Vendor:SceneImporterExporter', function () {

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

    describe('lights', function () {

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

});
