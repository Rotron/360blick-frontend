app.service('HistoryService',[function() {

    this.history = [];

    this.queue = function(newEntry) {
        this.history.push(newEntry);
    };

    this.goBack = function() {
        if(this.history.length) {
            this.history.pop().cb();
        }
    }

    this.stepsLeft = function(){
        return !!this.history.length;
    }

}]);