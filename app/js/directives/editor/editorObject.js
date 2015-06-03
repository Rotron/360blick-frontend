app.directive('editorObject', ['$rootScope', 'EditorService', '$stateParams', function ($rootScope, EditorService, $stateParams) {
    return {
        restrict: 'E',
        templateUrl: 'partials/editor/editorObject.html',
        replace: true,
        link: function(scope, elem, attrs) {

            scope.isTemplateScene = !!$stateParams['templateId'];

            scope.$on('getEditorObject', function(mass, callback) {
                callback(scope.item);
            });

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
            };

            scope.remove = function(object) {
                EditorService.remove(object);
            };

            var editOptions = {
                'delete': scope.remove
            };

            scope.onSettingsSelect = function(id, item) {
                editOptions[id](item);
            };

            scope.edit = {
                items: [
                    {
                        id: 'delete',
                        title: 'Delete',
                        icon: 'fa-trash-o'
                    }
                ]
            };

        }
    };
}]);