'use strict';

app.controller('NewAssetController', ['$scope', '$stateParams', '$rootScope', function ($scope, $stateParams, $rootScope) {
    $scope.currentProjectId = $stateParams['projectId'];

    $scope.newAsset = {
        title: null,
        file: null,
        description: null,
        uploadData: {project: {id: $scope.currentProjectId}}
    };

}]);
