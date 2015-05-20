'use strict';

describe('Service: AssetStoreService', function() {

    beforeEach(module('360blickFrontendApp'));

    var AssetStoreService, RequestService, scope;

    beforeEach(inject(['AssetStoreService', '$rootScope', function (_AssetStoreService, $rootScope) {
        scope = $rootScope.$new();
        AssetStoreService = _AssetStoreService;
    }]));

    describe('inheritance', function() {

        it('parent methods', function() {
            expect(AssetStoreService.getData).toBeDefined();
        });

    });

});