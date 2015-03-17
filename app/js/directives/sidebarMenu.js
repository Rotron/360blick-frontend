app.directive('sidebarMenu', ['RequestService', 'btfModal', function (RequestService, btfModal) {
    return {
        restrict: 'E',
        templateUrl: 'partials/sidebarMenu.html',
        replace: true,
        link: function(scope, elem, attrs) {

            scope.projects = [];
            RequestService.post('projects/get_own_projects', {}, function(res) {
                    scope.projects = res.data;
                }, function(error) {
                    console.log(error);
                }
            );
        }
    };
}]);