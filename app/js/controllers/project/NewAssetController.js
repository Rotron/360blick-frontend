'use strict';

app.controller('NewAssetController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.currentProjectId = $stateParams['projectId'];
    if(!$scope.data) $scope.data = {};

    $scope.modalHeader = $scope.data.modalHeader || 'New Asset';

    $scope.upload = {
        settings: {
            broadcastDomain: $scope.data.broadcastDomain || 'newAsset',
            apiEndPoint: $scope.data.apiEndPoint || 'projects/assets/create',
            paramName: $scope.data.paramName || 'data[asset][file]',
            maxFiles: $scope.data.maxFiles || 10
        },
        data: $scope.data.uploadData || {project: {id: $scope.currentProjectId}}
    };

}]);