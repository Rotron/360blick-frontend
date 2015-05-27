'use strict';

app.filter('unixTimestamp', [function () {

    return function(input) {
        return Date.parse(input);
    }

}]);
