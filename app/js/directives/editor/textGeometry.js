app.directive('textGeometry',['PrimitiveObjectService', function(PrimitiveObjectService) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/editor/textGeometry.html',
        scope: {
            title: "@",
            item: "="
        },
        link: function(scope) {
            scope.$watch('item.custom.text', function(val) {
                PrimitiveObjectService.changeText(val, scope.item);
            });
        }
    };
}]);