app.directive('editorObject', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'partials/editorObject.html',
        replace: true,
        link: function(scope, elem, attrs) {
            $rootScope.$on('objectSelected', function(event, object) {
                if(scope.item.id == object.id){
                    scope.isActive = true;
                    if(!scope.item.detailsOpen && !elem.hasClass('active')) {
                        scope.item.detailsOpen = true;
                    }
                }else{
                    scope.isActive = false;
                }

                //avoid collision with angulars digest cycle
                if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                    scope.$apply();
                }
            });

            scope.setActive = function() {
                if(scope.isActive){
                    scope.item.detailsOpen = !scope.item.detailsOpen;
                }
                $rootScope.$emit('objectSelected', scope.item);
            }

        }
    };
}]);