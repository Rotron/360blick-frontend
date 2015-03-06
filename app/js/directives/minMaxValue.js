app.directive('minMaxValue',[ function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/partials/minMaxValue.html',
        scope: {
            title: "@",
            item: "=",
            step: "@stepSize",
            min: "@minimum",
            max: "@maximum"
        },
        link: function(scope) {


        }
    };
}]);