app.directive('sidebarMenu', ['AuthService', function (AuthService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/sidebarMenu.html',
        replace: true,
        link: function(scope, elem, attrs) {

        }
    };
}]);