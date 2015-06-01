app.directive('navHeader', [function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/navHeader.html',
        replace: true,
        link: function(scope, elem, attrs) {
        }
    };
}]);