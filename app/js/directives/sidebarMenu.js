app.directive('sidebarMenu', ['Project', function (Project) {
    return {
        restrict: 'E',
        templateUrl: 'partials/sidebarMenu.html',
        replace: true,
        link: function(scope, elem, attrs) {

            scope.projects = Project.get(function(projects){
                scope.projects = projects;
            });
        }
    };
}]);