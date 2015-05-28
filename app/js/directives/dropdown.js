app.directive('dropdown',[function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
            onSelect: '=',
            classSuffix: '@'
        },
        link: function(scope, element, attrs) {
            scope.active = false;

            scope.select = {
                value: null
            };

            scope.toggleDropdown = function() {
                scope.active = !scope.active;
            };

            scope.selectDropdownItem = function(id, value) {
                scope.active = false;
                scope.select.value = value;
                if(typeof(scope.onSelect) == "function") {
                    scope.onSelect(id);
                }
            }
        },
        templateUrl: function(elem,attrs) {
            return 'partials/dropdown/' + attrs.templateName + '.html';
        }
    }
}]);