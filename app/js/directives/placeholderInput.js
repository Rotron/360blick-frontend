app.directive('placeholderInput', [ function (AuthService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/placeholderInput.html',
        replace: true,
        scope: { value: '=', label: '@', type: '@' },
        link: function(scope, elem, attrs) {
            scope.isFocused = false;

            scope.onChange = function() {
            };

            scope.onBlur = function() {
                scope.isFocused = false;
            };

            scope.setFocus = function() {
                elem[0].querySelector('input').focus();
                scope.isFocused = true;
            };
        }
    };
}]);