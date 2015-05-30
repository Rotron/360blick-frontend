app.directive('editorScene', ['EditorService', 'ObjectSelectionService', function (EditorService, ObjectSelectionService) {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, elem, attrs) {
            EditorService.init(elem);
            ObjectSelectionService.init(elem);
        }
    };
}]);