'use strict';

app.controller('ProjectSettingsController', ['$scope', '$stateParams', 'RequestService', '$rootScope', 'ENV_CONFIG', function ($scope, $stateParams, RequestService, $rootScope, ENV_CONFIG) {
    $scope.username = $stateParams.username;
    $scope.projectId = $stateParams.projectId;

    $scope.uploadOptions = {
        broadcastDomain: 'newAssetProjectSettings',
        apiEndPoint: 'projects/update',
        paramName: 'data[project][preview_image]',
        uploadData: {project: {id: $scope.projectId}}
    };

    $rootScope.$on('newAssetProjectSettings', function(event, data) {
        console.log('new project image:', data);
    });

    // Get project settings
    RequestService.post('projects/specific', {project_id: $scope.projectId}, function(res) {   

            $scope.project = res.data;

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
