'use strict';

app.controller('NewsletterController', ['$scope', 'RequestService', 'ModalService', function ($scope, RequestService, ModalService) {
    $scope.subscribeToNewsletter = function(credentials) {
        if(!credentials) {
          credentials = {};
        }
        RequestService.post('newsletter/subscribe', {data:{email: credentials.email, name: credentials.name}}, function(res) {
                ModalService.openModal('info', {title: 'Success', message: 'Thank you for subscribing. Please check your emails and submit the subscription!'});
            }, function(error) {
                console.log(error);
            }
        );
    };
}]);

