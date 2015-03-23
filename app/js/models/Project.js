'use strict';

app.service('Project', ['RequestService', function (RequestService) {
    var all = {
        projects: []
    };

    var subscribers = [];

    function update(){
        angular.forEach(subscribers, function(callback){
            callback(all.projects);
        })
    }

    function onSuccess(res){
        all.projects = res.data;
        update();
    }

    this.get = function(callback){
        subscribers.push(callback);
        return all.projects;
    };

    this.create = function(newProject){
        if(newProject.title){
            RequestService.post('projects/create', {project: newProject}, function(res) {
                    all.projects.push(res.data);
                    update();
                }, function(error) {
                    console.log(error);
                }
            );
        }
    };

    this.delete = function(projectId){
        if(newProject.title){
            RequestService.post('projects/create', {project: newProject}, function(res) {
                    all.projects.push(res.data);
                    update();
                }, function(error) {
                    console.log(error);
                }
            );
        }
    };

    RequestService.post('projects/get_own_projects', {}, onSuccess.bind(this), function(error) {
            console.log(error);
        }
    );

}]);

