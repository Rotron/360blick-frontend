'use strict';

app.controller('NewSceneController', ['$scope', 'RequestService', '$stateParams', '$rootScope', '$state', 'TemplateStoreService', function ($scope, RequestService, $stateParams, $rootScope, $state, TemplateStoreService) {
    $scope.currentProjectId = $stateParams['projectId'];
    $scope.currentTemplateId = null;
    $scope.sceneTemplates = [];

    function getAllTemplates() {
        RequestService.post('templatescenes/all', {}, function (res) {
                $scope.sceneTemplates = res.data;
            }, function (error) {
                console.log(error);
            }
        );
    }

    getAllTemplates();

    $scope.onTemplateSelect = function(id){
        $scope.currentTemplateId = id;
    };

    $scope.newScene = {
        title: null,
        description: null
    };

    $scope.createNewScene = function(){
        var data = {
            project: {id: $scope.currentProjectId},
            scene: {
                title: $scope.newScene.title,
                template_id: $scope.currentTemplateId
            }
        };

        if($scope.newScene.title){
            RequestService.post('scenes/create', data, function(res) {
                    $rootScope.$broadcast('newScene', res.data);
                }, function(error) {
                    console.log(error);
                }
            );
        }
    }
}]);
