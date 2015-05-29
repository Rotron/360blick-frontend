app.directive('customNgModel',['$timeout', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            model: "="
        },
        link: function(scope, element) {
            $timeout(function() {
                $(element).on('input', function() {
                    scope.model = $(this).val();
                    if (scope.$$phase != '$apply' && scope.$$phase != '$digest') {
                        scope.$apply();
                    }
                })
            });
            scope.$watch('model', function(val) {
                    $(element).val(val);
            })
        }
    };
}]);

app.directive('minMaxValue',[function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/editor/minMaxValue.html',
        scope: {
            title: "@",
            item: "=",
            step: "@stepSize",
            min: "@minimum",
            max: "@maximum",
            measure: "@measure"
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