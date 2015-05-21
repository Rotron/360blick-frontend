'use strict';

app.controller('NewAssetController', ['$scope', '$stateParams', function ($scope, $stateParams) {

    $scope.currentProjectId = $stateParams['projectId'];

    $scope.newAsset = {
        title: null,
        file: null,
        description: null,
        uploadData: {project: {id: $scope.currentProjectId}}
    };

    /*

    $scope.currentProjectId = $stateParams['projectId'];

    function setCurrentProjectName() {
        for (var i in $scope.projects) {
            if($scope.projects[i].id == $scope.currentProjectId) {
                $scope.currentProjectName = $scope.projects[i].title;
                return;
            }
        }
    }

    ProjectStoreService.get({currentUser: currentUser}, function(projects){
        $scope.projects = projects;
        setCurrentProjectName();
    });

    $scope.onProjectSelect = function(id) {
        $scope.currentProjectId = id;
    };

    */

}]);
