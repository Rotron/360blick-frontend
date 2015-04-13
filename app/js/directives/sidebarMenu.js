app.directive('sidebarMenu', ['Project', 'SceneTemplate', '$rootScope', '$stateParams', function (Project, SceneTemplate, $rootScope, $stateParams) {
    return {
        restrict: 'E',
        templateUrl: 'partials/sidebarMenu.html',
        replace: true,
        link: function(scope, elem, attrs) {

            scope.username = $stateParams.username;

            scope.projects = Project.get(function(projects){
                scope.projects = projects;
            });

            scope.sceneTemplates = SceneTemplate.get(function(sceneTemplates){
                scope.sceneTemplates = sceneTemplates;
            });

            $rootScope.$on('newSceneTemplateCreated', function(event, data){
                scope.sceneTemplates.push(data);
            });
        }
    };
}]);