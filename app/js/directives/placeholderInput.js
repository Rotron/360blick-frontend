app.directive('placeholderInput', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'partials/placeholderInput.html',
        replace: true,
        scope: {
            value: '=',
            label: '@',
            type: '@' ,
            classSuffix: '@',
            hasInitialFocus: '='
        },
        link: function(scope, elem, attrs) {
            scope.isFocused = false;

            scope.onBlur = function() {
                scope.isFocused = false;
            };

            scope.onFocus = function() {
                scope.isFocused = true;
            };

            scope.setFocus = function($event) {
                $event && $event.stopPropagation();

                $timeout(function() {
                    elem[0].querySelector('input').focus();
                });
            };

            if(scope.hasInitialFocus) {
                $timeout(function() {
                    scope.setFocus();
                });
            }
        }
    };
}]);