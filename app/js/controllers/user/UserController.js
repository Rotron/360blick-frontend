'use strict';

app.controller('UserController', ['$scope', '$stateParams', 'RequestService', function ($scope, $stateParams, RequestService) {
    $scope.username = $stateParams['username'];

    RequestService.post('projects/get_own_projects', {}, function(res) {
            console.log(res);
        }, function(error) {
            console.log(error);
        }
    );

}]);
