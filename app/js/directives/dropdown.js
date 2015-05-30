app.directive('dropdown',[function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
            onSelect: '=',
            classSuffix: '@',
            parentItem: '='
        },
        link: function(scope, element, attrs) {
            scope.active = false;

            scope.select = {
                value: null
            };

            scope.toggleGhost = function($event) {
                $event && $event.stopPropagation();
                scope.active = !scope.active;
            };

            scope.toggleDropdown = function($event) {
                $event.stopPropagation();
                scope.active = !scope.active;
            };

            scope.selectDropdownItem = function(item, $event) {
                $event.stopPropagation();

                scope.active = false;
                scope.select.value = item.title;
                if(typeof(scope.onSelect) == "function") {
                    scope.onSelect(item.id, scope.parentItem);
                }
            }
        },
        templateUrl: function(elem,attrs) {
            return 'partials/dropdown/' + attrs.templateName + '.html';
        }
    }
}]);