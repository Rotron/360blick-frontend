'use strict';

app.controller('ProjectSettingsController', ['$scope', '$stateParams', 'RequestService', '$rootScope', 'ENV_CONFIG', 'ModalService', function ($scope, $stateParams, RequestService, $rootScope, ENV_CONFIG, ModalService) {
    $scope.username = $stateParams.username;
    $scope.projectId = $stateParams.projectId;
    $scope.assetUrl = ENV_CONFIG.assets;
    $scope.defaultImage = ENV_CONFIG.preview_image;

    $scope.uploadOptions = {
        broadcastDomain: 'updatedProjectPreviewImage',
        apiEndPoint: 'projects/update',
        paramName: 'data[project][preview_image]',
        uploadData: {project: {id: $scope.projectId}},
        modalHeader: 'New Preview Image'
    };

    $rootScope.$on('updatedProjectPreviewImage', function(event, data) {
        $scope.project.preview_image = data.preview_image;
    });

    RequestService.post('projects/specific', {project_id: $scope.projectId}, function(res) {
            $scope.project = res.data;
        }, function(error) {
            console.log(error);
        }
    );

    $scope.updateProjectSettings = function($event) {
        $event.stopPropagation();

        var data = {
            project: {
                id: $scope.project.id,
                title: $scope.project.title,
                description: $scope.project.description
            }
        };
        RequestService.post('projects/update', data, function(res) {
                $scope.project = res.data;
                ModalService.openModal('info', {title: 'Success', message: 'Successfully saved changes.'});
            }, function(error) {
                console.log(error);
            }
        );
    };

    $scope.exports = [];

    $scope.startDownload = function(item) {
        window.open(ENV_CONFIG.assets + item.path.slice(6, item.path.length), 'Download');
    };

    $scope.generateExport = function($event) {
        $event.stopPropagation();

        RequestService.post('projects/export/zip', {project: {id: $scope.projectId}}, function(res) {
                ModalService.openModal('info', {title: 'Success', message: 'Successfully started Export. This may take several seconds.'});
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
