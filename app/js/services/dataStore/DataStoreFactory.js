'use strict';

app.factory('DataStoreFactory', ['RequestService', '$stateParams', '$rootScope', '$crypto', function (RequestService, $stateParams, $rootScope, $crypto) {

    var DataStore = function(api) {
        this.api = api;

        this.data = {};
        this.subscribers = [];
    };

    DataStore.prototype.isOwnProfile = function() {
        return $rootScope.currentUser != $stateParams['username'];
    };

    DataStore.prototype.subscribe = function(callback) {
        this.subscribers.push(callback);
    };

    DataStore.prototype.notify = function() {
        angular.forEach(this.subscribers, (function(callback){
            callback(this.data.items);
        }).bind(this));
    };

    // FIXME: support multidimensional, find with response data
    DataStore.prototype.removeItemFromData = function(item) {
        var index = this.data.items.indexOf(item);
        this.data.items.splice(index, 1);
    };

    DataStore.prototype.isAlreadyFetched = function(identityObject) {
        return this.data.hasOwnProperty(JSON.stringify(identityObject));
    };

    DataStore.prototype.getData = function(identityObject, callback) {

        if(!this.isAlreadyFetched.call(this, identityObject)) {
            this.data[JSON.stringify(identityObject)] = {items: []};
            this.fetchData.call(this, identityObject, callback);
        }

        return this.data[JSON.stringify(identityObject)];
    };

    DataStore.prototype.fetchData = function(identityObject, callback) {
        RequestService.post(this.api.get.url, this.api.get.data(identityObject), (function(res) {
                this.data[JSON.stringify(identityObject)].items = res.data;
                callback && callback(res.data);
                this.notify();
            }).bind(this), (function(error) {
                console.log(error);
            }).bind(this)
        );
    };

    DataStore.prototype.createData = function(identityObject, callback) {
        RequestService.post(this.api.create.url, this.api.create.data(identityObject), (function(res) {
                this.data.items.push(res.data);
                callback && callback(res.data);
                this.notify();
            }).bind(this), function(error) {
                console.log(error);
            }
        );
    };

    DataStore.prototype.deleteData = function(identityObject, item, callback) {
        RequestService.post(this.api.delete.url, this.api.delete.data(identityObject), (function(res) {
                this.removeItemFromData(item);
                callback && callback(res.data);
                this.notify();
            }).bind(this), function(error) {
                console.log(error);
         }
        );
    };

    return DataStore;

}]);
