app.directive('texture',[ function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/editor/texture.html',
        scope: {
            title: "@",
            item: "="
        },
        link: function(scope) {
        }
    };
}]);