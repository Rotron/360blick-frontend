app.service('SaveSceneService', ['$rootScope', function ($rootScope) {

    this.save = function(){
        $rootScope.$broadcast('sceneSaved');
    }

}]);