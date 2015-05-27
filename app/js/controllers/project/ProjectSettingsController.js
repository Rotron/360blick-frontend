'use strict';

app.controller('ProjectSettingsController', ['$scope', '$stateParams', 'RequestService', function ($scope, $stateParams, RequestService) {
    $scope.username = $stateParams.username;
    $scope.projectId = $stateParams.projectId;

    $scope.generateExport = function($event) {
        $event.stopPropagation();

        $scope.exportUrl = null;

        RequestService.post('projects/export/zip', {project_id: $scope.projectId}, function(res) {
                $scope.exportUrl = res.data;
            }, function(error) {
                console.log(error);
            }
        );
    };

}]);
