app.directive('navHeader', ['AuthService', function (AuthService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/navHeader.html',
        replace: true,
        link: function(scope, elem, attrs) {
            scope.logout = function() {
                AuthService.logout();
            };
        }
    };
}]);