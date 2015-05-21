app.service('HistoryService',['$rootScope', function($rootScope) {

    this.history = [];
    this.changedObjectIds = [];

    /**
     * write new entry to history
     * @param newEntry {message, uuid, callback, (data)}
     */
    this.queue = function(newEntry) {
        if(this.changedObjectIds.indexOf(newEntry.uuid) == -1) {
            this.changedObjectIds.push(newEntry.uuid);
        }
        this.history.push(newEntry);
    };

    /**
     * go back one step in history
     */
    this.goBack = function() {
        if(this.history.length) {
            this.history.pop().callback();
        }
    };

    /**
     * returns if steps are left in the history
     * @returns {boolean}
     */
    this.stepsLeft = function(){
        return !!this.history.length;
    };

    /**
     * clear entire history
     */
    this.clearHistory = function() {
        this.history = [];
        this.changedObjectIds = [];
    };

    /**
     * clear only changed objectids
     */
    function clearObjectIds() {
        console.log('clearObjectIds');
        this.changedObjectIds = [];
    }

    $rootScope.$on('sceneSaved', clearObjectIds);

}]);