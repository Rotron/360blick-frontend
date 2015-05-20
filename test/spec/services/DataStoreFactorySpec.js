'use strict';

describe('Factory: DataStoreFactory', function() {

    beforeEach(module('360blickFrontendApp'));

    var DataStoreFactory, RequestService, apiDefaults, scope;

    beforeEach(inject(['DataStoreFactory', '$rootScope', function (_DataStoreFactory, $rootScope) {
        scope = $rootScope.$new();
        DataStoreFactory = _DataStoreFactory;

        apiDefaults = {
            get: {url: '', data: function() {}},
            create: {url: '', data: function() {}},
            delete: {url: '', data: function() {}}
        };

        RequestService = {
            get: function() {},
            post: function() {}
        }
    }]));

    describe('subscription', function() {

        it('add subscription in getData', function(){
            var dataStore = new DataStoreFactory(apiDefaults);
            dataStore.getData(0, function(){});
            expect(dataStore.subscribers.length).toEqual(1);
        });

        it('notify runs callback', function(){
            var dataStore = new DataStoreFactory(apiDefaults);
            var mockCallback = jasmine.createSpy('callback');

            dataStore.getData(0, mockCallback);

            dataStore.notify();
            expect(mockCallback).toHaveBeenCalled();
        });

    });

});