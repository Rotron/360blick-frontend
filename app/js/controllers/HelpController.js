'use strict';

app.controller('HelpController', ['$scope', 'RequestService', 'ModalService', function ($scope, RequestService, ModalService) {
    $scope.credentials = {};
    $scope.sendHelp = function(credentials) {
          RequestService.post('messages/feedback', {sender: credentials.sender, header: $scope.credentials.subject, body: credentials.message}, function(res) {
                  ModalService.openModal('info', {title: 'Success', message: 'Message sent. We will answer you as soon as possible!'});
                  $scope.closeIt();
              }, function(error) {
                  console.log(error);
              }
          );
      };
}]);

