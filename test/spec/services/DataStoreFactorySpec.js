'use strict';

xdescribe('Factory: DataStoreFactory', function() {

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

        it('subscription gets pushed', function(){
            var dataStore = new DataStoreFactory(apiDefaults);

            dataStore.subscribe(function(){});

            expect(dataStore.subscribers.length).toEqual(1);
        });

        it('notify runs callback', function(){
            var dataStore = new DataStoreFactory(apiDefaults);
            var mockCallback = jasmine.createSpy('callback');

            dataStore.subscribe(mockCallback);

            dataStore.notify();
            expect(mockCallback).toHaveBeenCalled();
        });

        it('notify runs callback', function(){
            var dataStore = new DataStoreFactory(apiDefaults);
            var mockCallback = jasmine.createSpy('callback');

            dataStore.subscribe(mockCallback);

            dataStore.notify();
            expect(mockCallback).toHaveBeenCalled();
        });

    });

});