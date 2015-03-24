app.directive('editorScene', ['EditorService', function (EditorService) {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, elem, attrs) {
            console.log('ccc');
            EditorService.init(elem);
        }
    };
}]);