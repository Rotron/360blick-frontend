'use strict';

app.service('Project', ['RequestService', '$stateParams', '$rootScope', function (RequestService, $stateParams, $rootScope) {

    var all = {
        projects: []
    };

    var subscribers = [];

    function update(){
        angular.forEach(subscribers, function(callback){
            callback(all.projects);
        })
    }

    function removeProjectFromArray(project) {
        var index = $scope.project.indexOf(project);
        $scope.project.splice(index, 1);
    }

    function onSuccess(res){
        all.projects = res.data;
        update();
    }

    this.get = function(callback){
        if(all.projects.length < 1 || $rootScope.currentUser != $stateParams['username']){
            RequestService.post('projects/get_projects', {user_nick: $rootScope.currentUser}, onSuccess.bind(this), function(error) {
                    console.log(error);
                }
            );
        }

        subscribers.push(callback);
        return all.projects;
    };

    this.create = function(newProject){
        if(newProject.title) return;

        RequestService.post('projects/create', {project: newProject}, function(res) {
                all.projects.push(res.data);
                update();
            }, function(error) {
                console.log(error);
            }
        );
    };

    this.delete = function(projectId){
        // TODO: uncomment when issue closed in backend
/*        RequestService.post('POST /api/v1/projects/delete.json', {project: {id: projectId}}, function(res) {
                removeProjectFromArray();
                update();
            }, function(error) {
                console.log(error);
            }
        );*/
    };

}]);
