app.directive('dropzone',['RequestService', function(RequestService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/dropzone.html',
        replace: true,
        scope: {
            uploadData: '=',
            uploadSettings: '='
        },
        link: function(scope, element) {

            element.bind("dragenter", function() {
                element.addClass('hover');
            });

            element.bind("dragleave", function() {
                element.removeClass('hover');
            });

            RequestService.upload(scope, element);
        }
    }
}]);