'use strict';

app.controller('UserController', ['$scope', '$stateParams', 'RequestService', function ($scope, $stateParams, RequestService) {
    $scope.username = $stateParams['username'];

    RequestService.get('users/secret', {}, function(res) {
            console.log(res);
        }, function(error) {
            console.log(error);
        }
    );

}]);
