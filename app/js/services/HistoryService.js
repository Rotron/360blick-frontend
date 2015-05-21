app.service('HistoryService',[function() {

    this.history = [];
    this.changedObjectIds = [];

    this.queue = function(newEntry) {
        if(this.changedObjectIds.indexOf(newEntry.uuid) == -1) {
            this.changedObjectIds.push(newEntry.uuid);
        }
        this.history.push(newEntry);
    };

    this.goBack = function() {
        if(this.history.length) {
            this.history.pop().callback();
        }
    }

    this.stepsLeft = function(){
        return !!this.history.length;
    }

}]);