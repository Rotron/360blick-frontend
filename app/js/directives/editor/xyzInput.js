app.directive('xyzInput',[ function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/editor/xyzInput.html',
        scope: {
            title: "@",
            icon: "@",
            item: "="
        },
        link: function(scope) {


        }
    };
}]);