app.directive('sidebarMenu', ['RequestService', '$rootScope', '$stateParams', function (RequestService, $rootScope, $stateParams) {
    return {
        restrict: 'E',
        templateUrl: 'partials/sidebarMenu.html',
        replace: true,
        link: function($scope, elem, attrs) {
            $scope.username = $stateParams.username;

            $scope.projects = [];
            $scope.sceneTemplates = [];

            function getAllProjects() {
                RequestService.post('projects/get_projects', {user_nick: $scope.username}, function (res) {
                        $scope.projects = res.data;
                    }, function (error) {
                        console.log(error);
                    }
                );
            }

            getAllProjects();

            $rootScope.$on('removeProject', function(event, data) {
                $scope.projects.splice($scope.projects.indexOf(data), 1);
            });

            $rootScope.$on('newProject', function(event, data) {
                $scope.projects.push(data);
            });

            function getAllTemplates() {
                RequestService.post('templatescenes/all', {}, function (res) {
                        $scope.sceneTemplates = res.data;
                    }, function (error) {
                        console.log(error);
                    }
                );
            }

            getAllTemplates();

            $rootScope.$on('removeTemplate', function(event, data) {
                $scope.sceneTemplates.splice($scope.sceneTemplates.indexOf(data), 1);
            });

            $rootScope.$on('newTemplate', function(event, data) {
                $scope.sceneTemplates.push(data);
            });

        }
    };
}]);