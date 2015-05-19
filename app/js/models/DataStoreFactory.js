'use strict';

app.factory('DataStoreFactory', ['RequestService', '$rootScope', function (RequestService, $rootScope) {

    var DataStore = function(dataObject, getUrl, createUrl, deleteUrl) {
        this.getUrl = getUrl;
        this.createUrl = createUrl;
        this.deleteUrl = deleteUrl;

        this.data = {
            items: []
        };

        this.subscribes = [];
    };

    DataStore.prototype.getIdentityObject = function(itemId) {
        console.log('not implemented: {type: {id: itemId}}');
    };

    DataStore.prototype.notify = function() {
        angular.forEach(this.subscribers, (function(callback){
            callback(this.data.items);
        }).bind(this))
    };

    DataStore.prototype.removeItemFromData = function(item) {
        var index = this.data.items.indexOf(item);
        this.data.items.splice(index, 1);
    };

    DataStore.prototype.getData = function(itemId, callback) {
        if(this.data.items.length < 1) {
            RequestService.post(this.getUrl, this.getIdentityObject(itemId), (function(res) {
                    this.data.items = res.data;
                    this.notify();
                }).bind(this), function(error) {
                    console.log(error);
                }
            ).bind(this);
        }

        this.subscribers.push(callback);
        return this.data.items;
    };

    DataStore.prototype.createItem = function(itemId, newAsset) {

        RequestService.post(this.createUrl, this.getIdentityObject(itemId), (function(res) {
                this.data.items.push(res.data);
                this.notify();
            }).bind(this), function(error) {
                console.log(error);
            }
        ).bind(this);
    };

    DataStore.prototype.deleteItem = function(itemId) {
        RequestService.post(this.deleteUrl, this.getIdentityObject(itemId), (function(res) {
            this.removeItemFromData(this.getIdentityObject(itemId));
            this.notify();
         }).bind(this), function(error) {
            console.log(error);
         }
        ).bind(this);
    };

    return DataStore;

}]);
