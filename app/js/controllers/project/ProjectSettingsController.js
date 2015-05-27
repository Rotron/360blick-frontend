'use strict';

app.controller('ProjectSettingsController', ['$scope', '$stateParams', 'RequestService', '$rootScope', 'ENV_CONFIG', function ($scope, $stateParams, RequestService, $rootScope, ENV_CONFIG) {
    $scope.username = $stateParams.username;
    $scope.projectId = $stateParams.projectId;
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
