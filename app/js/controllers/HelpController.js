'use strict';

app.controller('HelpController', ['$scope', 'RequestService', 'ModalService', 'SessionService', function ($scope, RequestService, ModalService, SessionService) {
    $scope.credentials = {};

    if(SessionService.email) {
        $scope.credentials.sender = SessionService.email;
    }

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

