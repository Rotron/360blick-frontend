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

        $scope.exportUrl = null;

        RequestService.post('projects/export/zip', {project: {id: $scope.projectId}}, function(res) {
                $scope.exportUrl = res.data;
                $rootScope.$broadcast('newExport', res.data);
            }, function(error) {
                console.log(error);
            }
        );
    };

    RequestService.post('projects/export/get_zip_files', {project: {id: $scope.projectId}}, function(res) {
            $scope.exports = res.data.userZipFiles;
        }, function(error) {
            console.log(error);
        }
    );

}]);
