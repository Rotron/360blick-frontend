'use strict';

app.controller('NewAssetController', ['$scope', '$rootScope', '$stateParams', 'RequestService', 'Project', 'Asset',
    function ($scope, $rootScope, $stateParams, RequestService, Project, Asset) {

    $scope.currentProjectId = $stateParams['projectId'];

    $scope.newAsset = {
        title: null,
        file: null,
        description: null,
        uploadData: {project: {id: $scope.currentProjectId}}
    };

    function setCurrentProjectName(){
        for (var i in $scope.projects) {
            if($scope.projects[i].id == $scope.currentProjectId){
                $scope.currentProjectName = $scope.projects[i].title;
                return;
            }
        }
    }

    $scope.projects = Project.get(function(projects){
        $scope.projects = projects;
        setCurrentProjectName();
    });

    if($scope.projects.length > 0){
        setCurrentProjectName();
    }

    $scope.onProjectSelect = function(id){
        $scope.currentProjectId = id;
    };

    $scope.createNewAsset = function() {
        console.log(Asset.create);
        //Asset.create($scope.currentProjectId, $scope.newAsset);
    };

}]);
