app.directive('dropzone',['RequestService', function(RequestService) {
    return {
        restrict: 'E',
        scope: {
            uploadData: '=',
            uploadSettings: '='
        },
        link: function(scope, element) {
            element.addClass('dropzone');

            RequestService.upload(scope, element);
        }
    }
}]);