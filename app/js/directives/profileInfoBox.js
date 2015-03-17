app.directive('profileInfoBox', ['AuthService', function (AuthService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/profileInfoBox.html',
        replace: true,
        link: function(scope, elem, attrs) {

        }
    };
}]);