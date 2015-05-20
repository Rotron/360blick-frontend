'use strict';

describe('Factory: DataStoreFactory', function() {

    beforeEach(module('360blickFrontendApp'));

    var DataStoreFactory, RequestService, scope;

    beforeEach(inject(['DataStoreFactory', '$rootScope', function (_DataStoreFactory, $rootScope) {
        scope = $rootScope.$new();
        DataStoreFactory = _DataStoreFactory

        RequestService = {
            get: function() {},
            post: function() {}
        }
    }]));

    describe('subscription', function() {

        it('add subscription in getData', function(){
            var dataStore = new DataStoreFactory();
            dataStore.getData(0, function(){});
            expect(dataStore.subscribers.length).toEqual(1);
        });

        it('notify runs callback', function(){
            var dataStore = new DataStoreFactory();
            var mockCallback = jasmine.createSpy('callback');

            dataStore.getData(0, mockCallback);

            dataStore.notify();
            expect(mockCallback).toHaveBeenCalled();
        });

    });

});