app.directive('placeholderInput', [ function (AuthService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/placeholderInput.html',
        replace: true,
        scope: {
            value: '=',
            label: '@',
            type: '@' ,
            classSuffix: '@'
        },
        link: function(scope, elem, attrs) {
            scope.isFocused = false;

            scope.onBlur = function() {
                console.log('blur');
                scope.isFocused = false;
            };

            scope.setFocus = function() {
                console.log('focus');
                elem[0].querySelector('input').focus();
                scope.isFocused = true;
            };
        }
    };
}]);