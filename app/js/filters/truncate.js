'use strict';

app.filter('truncate', [function () {

    /**
     * wordwise (boolean) if true, cut only by words bounds
     * max (integer) - max length of the text, cut to this number of chars
     * tail (string, default: ' …') - add this string to the input string if the string was cut
     */
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max || value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };

}]);
