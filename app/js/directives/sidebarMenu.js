app.directive('sidebarMenu', ['Project', 'SceneTemplates', '$rootScope', '$stateParams', function (Project, SceneTemplates, $rootScope, $stateParams) {
    return {
        restrict: 'E',
        templateUrl: 'partials/sidebarMenu.html',
        replace: true,
        link: function(scope, elem, attrs) {

            scope.username = $stateParams.username;

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