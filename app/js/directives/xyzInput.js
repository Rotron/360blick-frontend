app.directive('xyzInput',[ function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/partials/xyzInput.html',
        scope: {
            title: "@",
            item: "="
        },
        link: function(scope) {


        }
    };
}]);