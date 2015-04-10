app.directive('minMaxValue',[ function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/minMaxValue.html',
        scope: {
            title: "@",
            item: "=",
            step: "@stepSize",
            min: "@minimum",
            max: "@maximum"
        },
        link: function(scope) {

            //required for numeric binding
            if (scope.item && typeof scope.item == 'string') {
                scope.item = parseFloat(scope.item);
            }
            scope.$watch('item', function(val) {
                if (typeof val == 'string') {
                    scope.item = parseFloat(val);
                }
            });
        }
    };
}]);