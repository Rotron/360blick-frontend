app.directive('sidebarMenu', ['Project', 'SceneTemplates', '$rootScope', function (Project, SceneTemplates, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'partials/sidebarMenu.html',
        replace: true,
        link: function(scope, elem, attrs) {

            scope.projects = Project.get(function(projects){
                scope.projects = projects;
            });

            scope.sceneTemplates = SceneTemplates.get(function(sceneTemplates){
                scope.sceneTemplates = sceneTemplates;
            });

            $rootScope.$on('newSceneTemplateCreated', function(event, data){
                scope.sceneTemplates.push(data);
            });
        }
    };
}]);