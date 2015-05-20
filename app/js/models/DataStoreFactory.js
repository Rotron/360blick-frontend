'use strict';

app.factory('DataStoreFactory', ['RequestService', '$stateParams', '$rootScope', function (RequestService, $stateParams, $rootScope) {

    var DataStore = function(api) {
        this.api = api;

        this.data = {
            items: []
        };

        this.subscribers = [];
    };

    DataStore.prototype.isOwnProfile = function() {
        return $rootScope.currentUser != $stateParams['username'];
    };

    DataStore.prototype.notify = function() {
        angular.forEach(this.subscribers, (function(callback){
            callback(this.data.items);
        }).bind(this));
    };

    DataStore.prototype.removeItemFromData = function(item) {
        var index = this.data.items.indexOf(item);
        this.data.items.splice(index, 1);
    };

    DataStore.prototype.getData = function(identityObject, callback) {
        if(this.data.items.length < 1 || !this.isOwnProfile()) {
            RequestService.post(this.api.get.url, this.api.get.data(identityObject), (function(res) {
                    this.data.items = res.data;
                    this.notify();
                }).bind(this), function(error) {
                    console.log(error);
                }
            );
        }

        this.subscribers.push(callback);

        return this.data.items;
    };

    DataStore.prototype.createItem = function(identityObject) {
        RequestService.post(this.api.create.url, this.api.create.data(identityObject), (function(res) {
                this.data.items.push(res.data);
                this.notify();
            }).bind(this), function(error) {
                console.log(error);
            }
        );
    };

    DataStore.prototype.deleteItem = function(identityObject) {
        RequestService.post(this.api.delete.url, this.api.delete.data(identityObject), (function(res) {
            this.removeItemFromData(this.api.delete.data(identityObject));
            this.notify();
         }).bind(this), function(error) {
            console.log(error);
         }
        );
    };

    return DataStore;

}]);
