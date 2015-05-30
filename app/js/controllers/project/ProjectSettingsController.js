'use strict';

app.controller('ProjectSettingsController', ['$scope', '$stateParams', 'RequestService', '$rootScope', 'ENV_CONFIG', function ($scope, $stateParams, RequestService, $rootScope, ENV_CONFIG) {
    $scope.username = $stateParams.username;
    $scope.projectId = $stateParams.projectId;

    // Get project settings
    RequestService.post('projects/get_projects', {user_nick: $scope.username}, function(res) {
            for(var i = 0, len = res.data.length; i < len; i++) {
                if(parseInt(res.data[i].id) === parseInt($scope.projectId)) {
                    $scope.project = res.data[i];
                    $scope.updatedProject = {}
                    angular.copy($scope.project, $scope.updatedProject)
                    delete $scope.updatedProject.title;
                    delete $scope.updatedProject.description;
                    delete $scope.updatedProject.preview_image;
                }
            }
        }, function(error) {
            console.log(error);
        }
    );

    $scope.updateProjectSettings = function($event) {
        $event.stopPropagation();

        console.log($scope.updatedProject);
        RequestService.post('projects/update', {project: $scope.updatedProject}, function(res) {
              $scope.project = res.data;
            }, function(error) {
                console.log(error);
            }
        );
    };

    // $scope.projectTitle = $stateParams.title;
    $scope.exports = [];

    $scope.startDownload = function(item) {
        window.open(ENV_CONFIG.assets + item.path.slice(6, item.path.length), 'Download');
    };

    $scope.generateExport = function($event) {
        $event.stopPropagation();

        RequestService.post('projects/export/zip', {project: {id: $scope.projectId}}, function(res) {
                $rootScope.$broadcast('newExport', res.data.exportZipModel);
            }, function(error) {
                console.log(error);
            }
        );
    };

    $rootScope.$on('newExport', function(event, data) {
        console.log(data);
        $scope.exports.push(data);
    });

    RequestService.post('projects/export/get_zip_files', {project: {id: $scope.projectId}}, function(res) {
            $scope.exports = res.data.userZipFiles;
        }, function(error) {
            console.log(error);
        }
    );

}]);
